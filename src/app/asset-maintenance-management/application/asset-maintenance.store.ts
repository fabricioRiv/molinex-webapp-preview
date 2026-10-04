import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Machine } from '../domain/model/machine.entity';
import { MachineStatus } from '../domain/model/machine-status';
import { AssetMaintenanceApi } from '../infrastructure/asset-maintenance-api';

const REQUEST_RETRY_COUNT = 2;

export type AssetMaintenanceOperationError = 'create-machine' | 'load-machines';

@Injectable({ providedIn: 'root' })
export class AssetMaintenanceStore {
  readonly #api = inject(AssetMaintenanceApi);
  readonly #destroyRef = inject(DestroyRef);
  readonly #machinesSignal = signal<Machine[]>([]);
  readonly machines = this.#machinesSignal.asReadonly();
  readonly machineCount = computed(() => this.machines().length);
  readonly #pendingRequestCount = signal(0);
  readonly loading = computed(() => this.#pendingRequestCount() > 0);
  readonly #errorSignal = signal<AssetMaintenanceOperationError | null>(null);
  readonly error = this.#errorSignal.asReadonly();

  constructor() {
    this.#loadMachines();
  }

  countByStatus(status: MachineStatus): number {
    return this.machines().filter((machine) => machine.status === status).length;
  }

  codeExists(code: string): boolean {
    const normalizedCode = code.trim().toUpperCase();
    return this.machines().some((machine) => machine.code.value === normalizedCode);
  }

  addMachine(machine: Machine): void {
    this.#startRequest();
    this.#api
      .createMachine(machine)
      .pipe(retry(REQUEST_RETRY_COUNT))
      .subscribe({
        next: (createdMachine) => {
          this.#machinesSignal.update((machines) => [...machines, createdMachine]);
          this.#completeRequest();
        },
        error: () => this.#failRequest('create-machine'),
      });
  }

  reloadMachines(): void {
    this.#loadMachines();
  }

  #loadMachines(): void {
    this.#startRequest();
    this.#api
      .getMachines()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (machines) => {
          this.#machinesSignal.set(machines);
          this.#completeRequest();
        },
        error: () => this.#failRequest('load-machines'),
      });
  }

  #startRequest(): void {
    this.#pendingRequestCount.update((count) => count + 1);
    this.#errorSignal.set(null);
  }

  #completeRequest(): void {
    this.#pendingRequestCount.update((count) => Math.max(0, count - 1));
  }

  #failRequest(error: AssetMaintenanceOperationError): void {
    this.#errorSignal.set(error);
    this.#completeRequest();
  }
}
