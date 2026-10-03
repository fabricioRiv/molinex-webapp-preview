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
import { ProductionManagementStore } from '../../../application/production-management.store';
import { RawMaterialReception } from '../../../domain/model/raw-material-reception.entity';

const MILLISECONDS_PER_MINUTE = 60_000;

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  selector: 'app-raw-material-reception-form',
  styleUrl: './raw-material-reception-form.css',
  templateUrl: './raw-material-reception-form.html',
})
export class RawMaterialReceptionForm extends BaseForm {
  protected readonly store = inject(ProductionManagementStore);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  protected readonly measurementUnits: readonly MeasurementUnit[] = ['KILOGRAM', 'METRIC_TON'];
  protected readonly form = this.#formBuilder.nonNullable.group({
    receivedAt: [this.#toDateTimeLocal(new Date()), Validators.required],
    supplierName: ['', [Validators.required, Validators.maxLength(100)]],
    originDescription: ['', [Validators.required, Validators.maxLength(150)]],
    quantityValue: [0, [Validators.required, Validators.min(0.01)]],
    quantityUnit: ['KILOGRAM' as MeasurementUnit, Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const reception = new RawMaterialReception({
      id: 0,
      receivedAt: new Date(value.receivedAt),
      supplierName: value.supplierName.trim(),
      originDescription: value.originDescription.trim(),
      quantity: new Weight(value.quantityValue, value.quantityUnit),
    });

    this.store.addRawMaterialReception(reception);
    this.navigateToList();
  }

  protected navigateToList(): void {
    this.#router.navigate(['/production/receptions']).then();
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
