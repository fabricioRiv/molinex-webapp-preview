import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MeasurementUnit } from '../../../../production-quality-shared-kernel/domain/model/measurement-unit';
import { Weight } from '../../../../production-quality-shared-kernel/domain/model/weight';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { QualityControlStore } from '../../../application/quality-control.store';
import { WasteRecord } from '../../../domain/model/waste-record.entity';

const KILOGRAMS_PER_METRIC_TON = 1_000;
const MILLISECONDS_PER_MINUTE = 60_000;

@Component({
  imports: [
    DecimalPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  selector: 'app-waste-record-form',
  styleUrl: './waste-record-form.css',
  templateUrl: './waste-record-form.html',
})
export class WasteRecordForm extends BaseForm {
  protected readonly store = inject(QualityControlStore);
  protected readonly units: MeasurementUnit[] = ['KILOGRAM', 'METRIC_TON'];
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  protected readonly form = this.#formBuilder.nonNullable.group({
    productionRecordId: [0, [Validators.required, Validators.min(1)]],
    quantityValue: [0, [Validators.required, Validators.min(0.01)]],
    quantityUnit: ['KILOGRAM' as MeasurementUnit, Validators.required],
    recordedAt: [this.#toDateTimeLocal(new Date()), Validators.required],
  });

  protected selectedProductionRecord() {
    return this.store.productionRecordMap().get(this.form.controls.productionRecordId.value);
  }

  protected previewPercentage(): number | null {
    const productionRecord = this.selectedProductionRecord();
    const quantityValue = Number(this.form.controls.quantityValue.value);
    if (!productionRecord || quantityValue <= 0) return null;

    return (
      (this.#toKilograms(quantityValue, this.form.controls.quantityUnit.value) /
        this.#toKilograms(
          productionRecord.processedWeightValue,
          productionRecord.processedWeightUnit,
        )) *
      100
    );
  }

  protected submit(): void {
    const productionRecord = this.selectedProductionRecord();
    if (this.form.invalid || !productionRecord) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const quantityInKilograms = this.#toKilograms(value.quantityValue, value.quantityUnit);
    const baseWeightInKilograms = this.#toKilograms(
      productionRecord.processedWeightValue,
      productionRecord.processedWeightUnit,
    );
    if (quantityInKilograms > baseWeightInKilograms) {
      this.form.controls.quantityValue.setErrors({ exceedsProcessedWeight: true });
      this.form.controls.quantityValue.markAsTouched();
      return;
    }

    this.store.addWasteRecord(
      new WasteRecord({
        id: crypto.randomUUID(),
        productionRecordId: value.productionRecordId,
        quantity: new Weight(value.quantityValue, value.quantityUnit),
        baseWeight: new Weight(
          productionRecord.processedWeightValue,
          productionRecord.processedWeightUnit,
        ),
        recordedAt: new Date(value.recordedAt),
      }),
    );
    this.navigateToWasteOverview();
  }

  protected navigateToWasteOverview(): void {
    this.#router.navigate(['/quality/waste']).then();
  }

  protected unitSymbol(unit: MeasurementUnit): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  #toKilograms(value: number, unit: MeasurementUnit): number {
    return unit === 'METRIC_TON' ? value * KILOGRAMS_PER_METRIC_TON : value;
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
