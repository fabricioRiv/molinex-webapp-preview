import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { Machine } from '../domain/model/machine.entity';
import { MachineStatus } from '../domain/model/machine-status';
import { MaintenanceRecord } from '../domain/model/maintenance-record.entity';
import { AssetMaintenanceApi } from '../infrastructure/asset-maintenance-api';

const REQUEST_RETRY_COUNT = 2;

export type AssetMaintenanceOperationError =
  'create-machine' | 'create-maintenance' | 'load-machines' | 'load-maintenance';

@Injectable({ providedIn: 'root' })
export class AssetMaintenanceStore {
  readonly #api = inject(AssetMaintenanceApi);
  readonly #destroyRef = inject(DestroyRef);
  readonly #machinesSignal = signal<Machine[]>([]);
  readonly machines = this.#machinesSignal.asReadonly();
  readonly machineCount = computed(() => this.machines().length);
  readonly machineMap = computed(
    () => new Map(this.machines().map((machine) => [machine.id, machine])),
  );
  readonly #maintenanceRecordsSignal = signal<MaintenanceRecord[]>([]);
  readonly maintenanceRecords = this.#maintenanceRecordsSignal.asReadonly();
  readonly preventiveMaintenanceRecords = computed(() =>
    this.maintenanceRecords().filter((record) => record.type === 'PREVENTIVE'),
  );
  readonly preventiveMaintenanceCount = computed(() => this.preventiveMaintenanceRecords().length);
  readonly #pendingRequestCount = signal(0);
  readonly loading = computed(() => this.#pendingRequestCount() > 0);
  readonly #errorSignal = signal<AssetMaintenanceOperationError | null>(null);
  readonly error = this.#errorSignal.asReadonly();

  constructor() {
    this.#loadMachines();
    this.#loadMaintenanceRecords();
  }

  countByStatus(status: MachineStatus): number {
    return this.machines().filter((machine) => machine.status === status).length;
  }

  codeExists(code: string): boolean {
    const normalizedCode = code.trim().toUpperCase();
    return this.machines().some((machine) => machine.code.value === normalizedCode);
  }

  machineExists(machineId: string): boolean {
    return this.machineMap().has(machineId);
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

  addMaintenanceRecord(record: MaintenanceRecord): void {
    if (!this.machineExists(record.machineId)) {
      this.#errorSignal.set('create-maintenance');
      return;
    }

    this.#startRequest();
    this.#api
      .createMaintenanceRecord(record)
      .pipe(retry(REQUEST_RETRY_COUNT))
      .subscribe({
        next: (createdRecord) => {
          this.#maintenanceRecordsSignal.update((records) => [...records, createdRecord]);
          this.#completeRequest();
        },
        error: () => this.#failRequest('create-maintenance'),
      });
  }

  reloadMachines(): void {
    this.#loadMachines();
  }

  reloadMaintenance(): void {
    this.#loadMaintenanceRecords();
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

  #loadMaintenanceRecords(): void {
    this.#startRequest();
    this.#api
      .getMaintenanceRecords()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (records) => {
          this.#maintenanceRecordsSignal.set(records);
          this.#completeRequest();
        },
        error: () => this.#failRequest('load-maintenance'),
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
