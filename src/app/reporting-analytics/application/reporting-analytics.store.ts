import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OperationalSummary } from '../domain/model/operational-summary';
import { ReportingAnalyticsApi } from '../infrastructure/reporting-analytics-api';

@Injectable({ providedIn: 'root' })
export class ReportingAnalyticsStore {
  readonly #reportingAnalyticsApi = inject(ReportingAnalyticsApi);
  readonly #summarySignal = signal<OperationalSummary | null>(null);
  readonly #loadingSignal = signal(false);
  readonly #errorSignal = signal<string | null>(null);

  readonly summary = this.#summarySignal.asReadonly();
  readonly loading = this.#loadingSignal.asReadonly();
  readonly error = this.#errorSignal.asReadonly();

  constructor() {
    this.loadLatestSummary();
  }

  loadLatestSummary(): void {
    this.#loadingSignal.set(true);
    this.#errorSignal.set(null);

    this.#reportingAnalyticsApi
      .getOperationalSummaries()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (summaries) => {
          const latestSummary = [...summaries].sort(
            (current, previous) => previous.generatedAt.getTime() - current.generatedAt.getTime(),
          )[0];

          this.#summarySignal.set(latestSummary ?? null);
          this.#loadingSignal.set(false);
        },
        error: () => {
          this.#errorSignal.set('operational-summary.load-error');
          this.#loadingSignal.set(false);
        },
      });
  }
}
