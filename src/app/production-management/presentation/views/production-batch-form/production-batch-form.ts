import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  protected readonly form = this.#formBuilder.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(50)]],
    receptionId: [this.#requestedReceptionId(), [Validators.required, Validators.min(1)]],
    registeredAt: [this.#toDateTimeLocal(new Date()), Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const productionBatch = new ProductionBatch({
      id: 0,
      code: value.code.trim(),
      receptionId: value.receptionId,
      registeredAt: new Date(value.registeredAt),
    });

    this.store.addProductionBatch(productionBatch);

    this.navigateToList();
  }

  protected navigateToList(): void {
    this.#router.navigate(['/production/batches']).then();
  }

  protected measurementUnitSymbol(unit: string): string {
    return unit === 'METRIC_TON' ? 't' : 'kg';
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }

  #requestedReceptionId(): number {
    const receptionId = Number(this.#route.snapshot.queryParamMap.get('receptionId'));
    return Number.isInteger(receptionId) && receptionId > 0 ? receptionId : 0;
  }
}
