import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ProductionBatch } from '../../../domain/model/production-batch.entity';
import { ProductionRecord } from '../../../domain/model/production-record.entity';

@Component({
  imports: [DatePipe, DecimalPipe, MatButtonModule, RouterLink, TranslatePipe],
  selector: 'app-production-process-flow',
  styleUrl: './production-process-flow.css',
  templateUrl: './production-process-flow.html',
})
export class ProductionProcessFlow {
  readonly batch = input.required<ProductionBatch>();
  readonly records = input.required<ProductionRecord[]>();

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }
}
