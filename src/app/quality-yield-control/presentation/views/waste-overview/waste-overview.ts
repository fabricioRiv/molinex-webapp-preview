import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MeasurementUnit } from '../../../../production-quality-shared-kernel/domain/model/measurement-unit';
import { QualityControlStore } from '../../../application/quality-control.store';

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
  selector: 'app-waste-overview',
  styleUrl: './waste-overview.css',
  templateUrl: './waste-overview.html',
})
export class WasteOverview {
  protected readonly store = inject(QualityControlStore);
  protected readonly batchFilter = signal<number | null>(null);
  protected readonly fromFilter = signal('');
  protected readonly toFilter = signal('');
  protected readonly availableBatchIds = computed(() => [
    ...new Set(this.store.productionRecords().map((record) => record.batchId)),
  ]);
  protected readonly filteredWasteRecords = computed(() => {
    const fromDate = this.fromFilter() ? new Date(`${this.fromFilter()}T00:00:00`) : null;
    const toDate = this.toFilter() ? new Date(`${this.toFilter()}T23:59:59.999`) : null;

    return [...this.store.wasteRecords()]
      .filter((wasteRecord) => {
        const productionRecord = this.store
          .productionRecordMap()
          .get(wasteRecord.productionRecordId);
        const matchesBatch =
          this.batchFilter() === null || productionRecord?.batchId === this.batchFilter();
        const matchesFrom = fromDate === null || wasteRecord.recordedAt >= fromDate;
        const matchesTo = toDate === null || wasteRecord.recordedAt <= toDate;
        return matchesBatch && matchesFrom && matchesTo;
      })
      .sort((first, second) => second.recordedAt.getTime() - first.recordedAt.getTime());
  });
  protected readonly totalWasteInKilograms = computed(() =>
    this.filteredWasteRecords().reduce((total, record) => total + record.quantityInKilograms(), 0),
  );
  protected readonly averageWastePercentage = computed(() => {
    const percentages = this.filteredWasteRecords()
      .map((record) => record.percentage?.value ?? null)
      .filter((value): value is number => value !== null);
    return percentages.length === 0
      ? 0
      : percentages.reduce((total, value) => total + value, 0) / percentages.length;
  });

  protected updateBatchFilter(value: number | null): void {
    this.batchFilter.set(value);
  }

  protected updateFromFilter(event: Event): void {
    this.fromFilter.set((event.target as HTMLInputElement).value);
  }

  protected updateToFilter(event: Event): void {
    this.toFilter.set((event.target as HTMLInputElement).value);
  }

  protected clearFilters(): void {
    this.batchFilter.set(null);
    this.fromFilter.set('');
    this.toFilter.set('');
  }

  protected unitSymbol(unit: MeasurementUnit): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }
}
