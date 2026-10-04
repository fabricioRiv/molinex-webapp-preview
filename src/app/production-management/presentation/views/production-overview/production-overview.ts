import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionManagementStore } from '../../../application/production-management.store';
import { ProductionTraceability } from '../../components/production-traceability/production-traceability';

type ProductionActivity =
  | {
      kind: 'reception';
      id: number;
      occurredAt: Date;
      supplierName: string;
      originDescription: string;
      quantityValue: number;
      quantityUnit: string;
    }
  | {
      kind: 'batch';
      id: number;
      occurredAt: Date;
      code: string;
      receptionId: number;
    };

const RECENT_ACTIVITY_LIMIT = 6;

@Component({
  imports: [
    DatePipe,
    DecimalPipe,
    MatButtonModule,
    MatProgressSpinner,
    ProductionTraceability,
    RouterLink,
    TranslatePipe,
  ],
  selector: 'app-production-overview',
  styleUrl: './production-overview.css',
  templateUrl: './production-overview.html',
})
export class ProductionOverview {
  protected readonly store = inject(ProductionManagementStore);
  protected readonly receivedTodayCount = computed(() => {
    const today = new Date();
    return this.store
      .rawMaterialReceptions()
      .filter((reception) => this.#isSameLocalDate(reception.receivedAt, today)).length;
  });
  protected readonly registeredTodayCount = computed(() => {
    const today = new Date();
    return this.store
      .productionBatches()
      .filter((batch) => this.#isSameLocalDate(batch.registeredAt, today)).length;
  });
  protected readonly linkedBatchCount = computed(() => {
    const receptionMap = this.store.rawMaterialReceptionMap();
    return this.store
      .productionBatches()
      .filter((batch) => receptionMap.has(batch.receptionId)).length;
  });
  protected readonly traceabilityPercentage = computed(() => {
    const batchCount = this.store.productionBatchCount();
    return batchCount === 0 ? 0 : (this.linkedBatchCount() / batchCount) * 100;
  });
  protected readonly recentActivity = computed<ProductionActivity[]>(() => {
    const receptions: ProductionActivity[] = this.store.rawMaterialReceptions().map((reception) => ({
      kind: 'reception',
      id: reception.id,
      occurredAt: reception.receivedAt,
      supplierName: reception.supplierName,
      originDescription: reception.originDescription,
      quantityValue: reception.quantity.value,
      quantityUnit: reception.quantity.unit,
    }));
    const batches: ProductionActivity[] = this.store.productionBatches().map((batch) => ({
      kind: 'batch',
      id: batch.id,
      occurredAt: batch.registeredAt,
      code: batch.code,
      receptionId: batch.receptionId,
    }));

    return [...receptions, ...batches]
      .sort((first, second) => second.occurredAt.getTime() - first.occurredAt.getTime())
      .slice(0, RECENT_ACTIVITY_LIMIT);
  });

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  #isSameLocalDate(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }
}
