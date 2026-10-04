import { Component, computed, effect, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MeasurementUnit } from '../../../../production-quality-shared-kernel/domain/model/measurement-unit';
import { Weight } from '../../../../production-quality-shared-kernel/domain/model/weight';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { ProductionManagementStore } from '../../../application/production-management.store';
import { ProductionDetails } from '../../../domain/model/production-details';
import { ProductionRecord } from '../../../domain/model/production-record.entity';
import { ProductionStatus } from '../../../domain/model/production-status';

const MILLISECONDS_PER_MINUTE = 60_000;

function chronologicalOrderValidator(control: AbstractControl): ValidationErrors | null {
  const startedAt = control.get('startedAt')?.value as string | undefined;
  const finishedAt = control.get('finishedAt')?.value as string | undefined;
  if (!startedAt || !finishedAt) return null;

  return new Date(finishedAt) >= new Date(startedAt) ? null : { chronologicalOrder: true };
}

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinner,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  selector: 'app-production-record-form',
  styleUrl: './production-record-form.css',
  templateUrl: './production-record-form.html',
})
export class ProductionRecordForm extends BaseForm {
  protected readonly store = inject(ProductionManagementStore);
  readonly #formBuilder = inject(FormBuilder);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  protected readonly recordId = this.#readRecordId();
  protected readonly editing = this.recordId !== null;
  protected readonly existingRecord = computed(() =>
    this.recordId === null
      ? null
      : (this.store.productionRecords().find((record) => record.id === this.recordId) ?? null),
  );
  protected readonly recordNotFound = computed(
    () => this.editing && !this.store.loading() && this.existingRecord() === null,
  );
  protected readonly measurementUnits: readonly MeasurementUnit[] = ['KILOGRAM', 'METRIC_TON'];
  protected readonly statuses: readonly ProductionStatus[] = [
    'REGISTERED',
    'IN_PROGRESS',
    'COMPLETED',
  ];
  protected readonly form = this.#formBuilder.nonNullable.group(
    {
      batchId: [this.#requestedBatchId(), [Validators.required, Validators.min(1)]],
      processName: ['', [Validators.required, Validators.maxLength(100)]],
      processedWeightValue: [0, [Validators.required, Validators.min(0.01)]],
      processedWeightUnit: ['KILOGRAM' as MeasurementUnit, Validators.required],
      startedAt: [this.#toDateTimeLocal(new Date()), Validators.required],
      finishedAt: [''],
      status: ['REGISTERED' as ProductionStatus, Validators.required],
    },
    { validators: chronologicalOrderValidator },
  );
  #formPopulated = false;

  constructor() {
    super();
    effect(() => {
      const record = this.existingRecord();
      if (!record || this.#formPopulated) return;

      this.form.patchValue({
        batchId: record.batchId,
        processName: record.details.processName,
        processedWeightValue: record.details.processedWeight.value,
        processedWeightUnit: record.details.processedWeight.unit,
        startedAt: this.#toDateTimeLocal(record.details.startedAt),
        finishedAt: record.details.finishedAt
          ? this.#toDateTimeLocal(record.details.finishedAt)
          : '',
        status: record.details.status,
      });
      this.form.controls.batchId.disable({ emitEvent: false });
      this.#formPopulated = true;
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const existingRecord = this.existingRecord();
    if (this.editing && !existingRecord) return;

    const productionRecord = new ProductionRecord({
      id: existingRecord?.id ?? 0,
      batchId: existingRecord?.batchId ?? value.batchId,
      details: new ProductionDetails({
        processName: value.processName,
        processedWeight: new Weight(value.processedWeightValue, value.processedWeightUnit),
        startedAt: new Date(value.startedAt),
        finishedAt: value.finishedAt ? new Date(value.finishedAt) : null,
        status: value.status,
      }),
      recordedAt: existingRecord?.recordedAt ?? new Date(),
    });

    if (this.editing) {
      this.store.updateProductionRecord(productionRecord);
    } else {
      this.store.addProductionRecord(productionRecord);
    }
    this.navigateToOverview();
  }

  protected navigateToOverview(): void {
    this.#router.navigate(['/production']).then();
  }

  protected selectedBatchCode(): string | null {
    return (
      this.store.productionBatches().find((batch) => batch.id === this.form.controls.batchId.value)
        ?.code ?? null
    );
  }

  #requestedBatchId(): number {
    const batchId = Number(this.#route.snapshot.queryParamMap.get('batchId'));
    return Number.isInteger(batchId) && batchId > 0 ? batchId : 0;
  }

  #readRecordId(): number | null {
    const routeValue = this.#route.snapshot.paramMap.get('id');
    if (!routeValue) return null;

    const recordId = Number(routeValue);
    return Number.isInteger(recordId) && recordId > 0 ? recordId : null;
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
