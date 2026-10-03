import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionBatch } from '../../../domain/model/production-batch.entity';
import { RawMaterialReception } from '../../../domain/model/raw-material-reception.entity';

@Component({
  imports: [DatePipe, DecimalPipe, MatButtonModule, RouterLink, TranslatePipe],
  selector: 'app-production-traceability',
  styleUrl: './production-traceability.css',
  templateUrl: './production-traceability.html',
})
export class ProductionTraceability {
  readonly receptions = input.required<RawMaterialReception[]>();
  readonly batches = input.required<ProductionBatch[]>();
  protected readonly batchesByReception = computed(() => {
    const batchesByReception = new Map<number, ProductionBatch[]>();

    for (const batch of this.batches()) {
      const receptionBatches = batchesByReception.get(batch.receptionId) ?? [];
      batchesByReception.set(batch.receptionId, [...receptionBatches, batch]);
    }

    return batchesByReception;
  });
  protected readonly unlinkedBatches = computed(() => {
    const receptionIds = new Set(this.receptions().map((reception) => reception.id));
    return this.batches().filter((batch) => !receptionIds.has(batch.receptionId));
  });

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }
}
