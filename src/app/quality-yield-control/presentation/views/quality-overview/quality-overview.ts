import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { QualityControlStore } from '../../../application/quality-control.store';
import { QualityIndicator } from '../../../domain/model/quality-indicator';

@Component({
  imports: [DatePipe, DecimalPipe, MatButtonModule, MatProgressSpinner, RouterLink, TranslatePipe],
  selector: 'app-quality-overview',
  styleUrl: './quality-overview.css',
  templateUrl: './quality-overview.html',
})
export class QualityOverview {
  protected readonly store = inject(QualityControlStore);
  protected readonly recentAssessments = computed(() =>
    [...this.store.assessments()]
      .sort((first, second) => second.assessedAt.getTime() - first.assessedAt.getTime())
      .slice(0, 8),
  );
  protected readonly averageWholeGrain = computed(() =>
    this.#averageMeasurement('WHOLE_GRAIN_PERCENTAGE'),
  );
  protected readonly averageBrokenGrain = computed(() =>
    this.#averageMeasurement('BROKEN_GRAIN_PERCENTAGE'),
  );
  protected readonly averageYield = computed(() => this.#averageMeasurement('YIELD_PERCENTAGE'));

  protected measurementValue(assessmentId: number, indicator: QualityIndicator): number {
    return (
      this.store
        .assessments()
        .find((assessment) => assessment.id === assessmentId)
        ?.measurementValue(indicator) ?? 0
    );
  }

  #averageMeasurement(indicator: QualityIndicator): number {
    const values = this.store
      .assessments()
      .map((assessment) => assessment.measurementValue(indicator))
      .filter((value): value is number => value !== null);
    return values.length === 0
      ? 0
      : values.reduce((total, value) => total + value, 0) / values.length;
  }
}
