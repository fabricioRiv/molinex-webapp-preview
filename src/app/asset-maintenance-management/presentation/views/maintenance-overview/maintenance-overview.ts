import { DatePipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AssetMaintenanceStore } from '../../../application/asset-maintenance.store';

@Component({
  imports: [
    DatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinner,
    MatSelectModule,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-maintenance-overview',
  styleUrl: './maintenance-overview.css',
  templateUrl: './maintenance-overview.html',
})
export class MaintenanceOverview {
  protected readonly store = inject(AssetMaintenanceStore);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  protected readonly selectedMachineId = toSignal(
    this.#route.queryParamMap.pipe(map((params) => params.get('machineId'))),
    { initialValue: this.#route.snapshot.queryParamMap.get('machineId') },
  );
  protected readonly selectedMachine = computed(() => {
    const machineId = this.selectedMachineId();
    return machineId ? (this.store.machineMap().get(machineId) ?? null) : null;
  });
  protected readonly preventiveRecords = computed(() => {
    const machineId = this.selectedMachineId();
    return [...this.store.preventiveMaintenanceRecords()]
      .filter((record) => !machineId || record.machineId === machineId)
      .sort((first, second) => second.performedAt.getTime() - first.performedAt.getTime());
  });
  protected readonly upcomingCount = computed(
    () => this.preventiveRecords().filter((record) => this.isUpcoming(record.performedAt)).length,
  );
  protected readonly coveredMachineCount = computed(
    () => new Set(this.preventiveRecords().map((record) => record.machineId)).size,
  );

  protected isUpcoming(date: Date): boolean {
    return date.getTime() > Date.now();
  }

  protected updateMachineFilter(machineId: string | null): void {
    this.#router
      .navigate([], {
        relativeTo: this.#route,
        queryParams: { machineId },
        queryParamsHandling: 'merge',
      })
      .then();
  }
}
