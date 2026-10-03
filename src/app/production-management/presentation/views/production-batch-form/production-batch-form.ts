import { DecimalPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { ProductionManagementStore } from '../../../application/production-management.store';
import { ProductionBatch } from '../../../domain/model/production-batch.entity';

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
  selector: 'app-production-batch-form',
  styleUrl: './production-batch-form.css',
  templateUrl: './production-batch-form.html',
})
export class ProductionBatchForm extends BaseForm {
  protected readonly store = inject(ProductionManagementStore);
  readonly #formBuilder = inject(FormBuilder);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #productionBatchId = Number(this.#route.snapshot.paramMap.get('id')) || 0;
  protected readonly isEditMode = this.#productionBatchId > 0;
  protected readonly productionBatch = this.store.getProductionBatchById(this.#productionBatchId);
  #formInitialized = false;

  protected readonly form = this.#formBuilder.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    receptionId: [0, [Validators.required, Validators.min(1)]],
    registeredAt: [this.#toDateTimeLocal(new Date()), Validators.required],
  });

  constructor() {
    super();

    effect(() => {
      const productionBatch = this.productionBatch();
      if (!productionBatch || this.#formInitialized) return;

      this.form.setValue({
        code: productionBatch.code,
        receptionId: productionBatch.receptionId,
        registeredAt: this.#toDateTimeLocal(productionBatch.registeredAt),
      });
      this.#formInitialized = true;
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const productionBatch = new ProductionBatch({
      id: this.#productionBatchId,
      code: value.code.trim(),
      receptionId: value.receptionId,
      registeredAt: new Date(value.registeredAt),
    });

    if (this.isEditMode) {
      this.store.updateProductionBatch(productionBatch);
    } else {
      this.store.addProductionBatch(productionBatch);
    }

    this.navigateToList();
  }

  protected navigateToList(): void {
    this.#router.navigate(['/production']).then();
  }

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
