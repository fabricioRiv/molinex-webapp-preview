import { Component, inject } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { QualityControlStore } from '../../../application/quality-control.store';
import {
  MAXIMUM_PERCENTAGE,
  MINIMUM_PERCENTAGE,
  Percentage,
} from '../../../domain/model/percentage';
import { QualityAssessment } from '../../../domain/model/quality-assessment.entity';
import { QualityIndicator } from '../../../domain/model/quality-indicator';
import { QualityMeasurement } from '../../../domain/model/quality-measurement';
import { QualityRange } from '../../../domain/model/quality-range';

const MILLISECONDS_PER_MINUTE = 60_000;

function grainCompositionValidator(control: AbstractControl): ValidationErrors | null {
  const wholeGrain = Number(control.get('wholeGrainPercentage')?.value ?? 0);
  const brokenGrain = Number(control.get('brokenGrainPercentage')?.value ?? 0);
  return wholeGrain + brokenGrain <= MAXIMUM_PERCENTAGE ? null : { invalidComposition: true };
}

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  selector: 'app-quality-assessment-form',
  styleUrl: './quality-assessment-form.css',
  templateUrl: './quality-assessment-form.html',
})
export class QualityAssessmentForm extends BaseForm {
  protected readonly store = inject(QualityControlStore);
  protected readonly minimumPercentage = MINIMUM_PERCENTAGE;
  protected readonly maximumPercentage = MAXIMUM_PERCENTAGE;
  readonly #formBuilder = inject(FormBuilder);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  protected readonly form = this.#formBuilder.nonNullable.group(
    {
      productionRecordId: [
        this.#requestedProductionRecordId(),
        [Validators.required, Validators.min(1)],
      ],
      wholeGrainPercentage: [0, this.#percentageValidators()],
      brokenGrainPercentage: [0, this.#percentageValidators()],
      yieldPercentage: [0, this.#percentageValidators()],
      assessedAt: [this.#toDateTimeLocal(new Date()), Validators.required],
    },
    { validators: grainCompositionValidator },
  );

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    const expectedRange = new QualityRange(
      new Percentage(MINIMUM_PERCENTAGE),
      new Percentage(MAXIMUM_PERCENTAGE),
    );
    const measurements: QualityMeasurement[] = [
      this.#measurement('WHOLE_GRAIN_PERCENTAGE', value.wholeGrainPercentage, expectedRange),
      this.#measurement('BROKEN_GRAIN_PERCENTAGE', value.brokenGrainPercentage, expectedRange),
      this.#measurement('YIELD_PERCENTAGE', value.yieldPercentage, expectedRange),
    ];

    this.store.addAssessment(
      new QualityAssessment({
        id: 0,
        productionRecordId: value.productionRecordId,
        measurements,
        assessedAt: new Date(value.assessedAt),
      }),
    );
    this.navigateToOverview();
  }

  protected navigateToOverview(): void {
    this.#router.navigate(['/quality']).then();
  }

  #measurement(
    indicator: QualityIndicator,
    value: number,
    expectedRange: QualityRange,
  ): QualityMeasurement {
    return new QualityMeasurement(indicator, new Percentage(value), expectedRange);
  }

  #percentageValidators() {
    return [
      Validators.required,
      Validators.min(MINIMUM_PERCENTAGE),
      Validators.max(MAXIMUM_PERCENTAGE),
    ];
  }

  #requestedProductionRecordId(): number {
    const recordId = Number(this.#route.snapshot.queryParamMap.get('productionRecordId'));
    return Number.isInteger(recordId) && recordId > 0 ? recordId : 0;
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
