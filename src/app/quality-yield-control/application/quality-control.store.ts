import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { retry } from 'rxjs';
import { ProductionRecordReference } from '../domain/model/production-record-reference';
import { QualityAssessment } from '../domain/model/quality-assessment.entity';
import { QualityControlApi } from '../infrastructure/quality-control-api';

const REQUEST_RETRY_COUNT = 2;

export type QualityOperationError = 'create-assessment' | 'load-assessments' | 'load-processes';

@Injectable({ providedIn: 'root' })
export class QualityControlStore {
  readonly #api = inject(QualityControlApi);
  readonly #destroyRef = inject(DestroyRef);
  readonly #assessmentsSignal = signal<QualityAssessment[]>([]);
  readonly assessments = this.#assessmentsSignal.asReadonly();
  readonly assessmentCount = computed(() => this.assessments().length);
  readonly #productionRecordsSignal = signal<ProductionRecordReference[]>([]);
  readonly productionRecords = this.#productionRecordsSignal.asReadonly();
  readonly productionRecordMap = computed(
    () => new Map(this.productionRecords().map((record) => [record.id, record])),
  );
  readonly #pendingRequestCount = signal(0);
  readonly loading = computed(() => this.#pendingRequestCount() > 0);
  readonly #errorSignal = signal<QualityOperationError | null>(null);
  readonly error = this.#errorSignal.asReadonly();

  constructor() {
    this.#loadAssessments();
    this.#loadProductionRecords();
  }

  addAssessment(assessment: QualityAssessment): void {
    this.#startRequest();
    this.#api
      .createQualityAssessment(assessment)
      .pipe(retry(REQUEST_RETRY_COUNT))
      .subscribe({
        next: (createdAssessment) => {
          this.#assessmentsSignal.update((assessments) => [...assessments, createdAssessment]);
          this.#completeRequest();
        },
        error: () => this.#failRequest('create-assessment'),
      });
  }

  reload(): void {
    this.#loadAssessments();
    this.#loadProductionRecords();
  }

  #loadAssessments(): void {
    this.#startRequest();
    this.#api
      .getQualityAssessments()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (assessments) => {
          this.#assessmentsSignal.set(assessments);
          this.#completeRequest();
        },
        error: () => this.#failRequest('load-assessments'),
      });
  }

  #loadProductionRecords(): void {
    this.#startRequest();
    this.#api
      .getProductionRecordReferences()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (records) => {
          this.#productionRecordsSignal.set(records);
          this.#completeRequest();
        },
        error: () => this.#failRequest('load-processes'),
      });
  }

  #startRequest(): void {
    this.#pendingRequestCount.update((count) => count + 1);
    this.#errorSignal.set(null);
  }

  #completeRequest(): void {
    this.#pendingRequestCount.update((count) => Math.max(0, count - 1));
  }

  #failRequest(error: QualityOperationError): void {
    this.#errorSignal.set(error);
    this.#completeRequest();
  }
}
