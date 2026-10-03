import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionManagementStore } from '../../../application/production-management.store';
import { ProductionRecord } from '../../../domain/model/production-record.entity';
import { ProductionStatus } from '../../../domain/model/production-status';

interface ProductionHistoryGroup {
  date: string;
  records: ProductionRecord[];
}

type StatusFilter = ProductionStatus | 'ALL';

@Component({
  imports: [
    DatePipe,
    DecimalPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
    MatSelectModule,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-production-history',
  styleUrl: './production-history.css',
  templateUrl: './production-history.html',
})
export class ProductionHistory {
  protected readonly store = inject(ProductionManagementStore);
  protected readonly statuses: readonly StatusFilter[] = [
    'ALL',
    'REGISTERED',
    'IN_PROGRESS',
    'COMPLETED',
  ];
  protected readonly dateFrom = signal('');
  protected readonly dateTo = signal('');
  protected readonly batchId = signal(0);
  protected readonly status = signal<StatusFilter>('ALL');
  protected readonly invalidPeriod = computed(
    () => Boolean(this.dateFrom() && this.dateTo() && this.dateFrom() > this.dateTo()),
  );
  protected readonly batchMap = computed(
    () => new Map(this.store.productionBatches().map((batch) => [batch.id, batch])),
  );
  protected readonly filteredRecords = computed(() => {
    if (this.invalidPeriod()) return [];

    return this.store
      .productionRecords()
      .filter((record) => {
        const processDate = this.#toLocalDateKey(record.details.startedAt);
        const matchesFrom = !this.dateFrom() || processDate >= this.dateFrom();
        const matchesTo = !this.dateTo() || processDate <= this.dateTo();
        const matchesBatch = this.batchId() === 0 || record.batchId === this.batchId();
        const matchesStatus = this.status() === 'ALL' || record.details.status === this.status();
        return matchesFrom && matchesTo && matchesBatch && matchesStatus;
      })
      .sort((first, second) => second.details.startedAt.getTime() - first.details.startedAt.getTime());
  });
  protected readonly historyGroups = computed<ProductionHistoryGroup[]>(() => {
    const groups = new Map<string, ProductionRecord[]>();
    for (const record of this.filteredRecords()) {
      const date = this.#toLocalDateKey(record.details.startedAt);
      groups.set(date, [...(groups.get(date) ?? []), record]);
    }
    return [...groups.entries()].map(([date, records]) => ({ date, records }));
  });
  protected readonly processedWeightKilograms = computed(() =>
    this.filteredRecords().reduce(
      (total, record) =>
        total +
        (record.details.processedWeight.unit === 'METRIC_TON'
          ? record.details.processedWeight.value * 1000
          : record.details.processedWeight.value),
      0,
    ),
  );
  protected readonly completedCount = computed(
    () =>
      this.filteredRecords().filter((record) => record.details.status === 'COMPLETED').length,
  );
  protected readonly involvedBatchCount = computed(
    () => new Set(this.filteredRecords().map((record) => record.batchId)).size,
  );

  protected updateDateFrom(event: Event): void {
    this.dateFrom.set((event.target as HTMLInputElement).value);
  }

  protected updateDateTo(event: Event): void {
    this.dateTo.set((event.target as HTMLInputElement).value);
  }

  protected clearFilters(): void {
    this.dateFrom.set('');
    this.dateTo.set('');
    this.batchId.set(0);
    this.status.set('ALL');
  }

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  #toLocalDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
