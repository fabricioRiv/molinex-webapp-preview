import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { BaseForm } from '../../../../shared/presentation/components/base-form/base-form';
import { AssetMaintenanceStore } from '../../../application/asset-maintenance.store';
import { CorrectiveMaintenanceDetails } from '../../../domain/model/corrective-maintenance-details';
import { MaintenanceDescription } from '../../../domain/model/maintenance-description';
import { MaintenanceRecord } from '../../../domain/model/maintenance-record.entity';
import { TechnicianReference } from '../../../domain/model/technician-reference';

const CURRENT_TECHNICIAN_ID = 'b3d36b83-013b-4655-ad0c-574704f0945e';
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
  selector: 'app-corrective-maintenance-form',
  styleUrl: './corrective-maintenance-form.css',
  templateUrl: './corrective-maintenance-form.html',
})
export class CorrectiveMaintenanceForm extends BaseForm {
  protected readonly store = inject(AssetMaintenanceStore);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  protected readonly form = this.#formBuilder.nonNullable.group({
    machineId: ['', Validators.required],
    performedAt: [this.#toDateTimeLocal(new Date()), Validators.required],
    responsibleDisplayName: ['', [Validators.required, Validators.maxLength(100)]],
    failure: ['', [Validators.required, Validators.maxLength(250)]],
    cause: ['', [Validators.required, Validators.maxLength(250)]],
    actionTaken: ['', [Validators.required, Validators.maxLength(500)]],
    downtimeMinutes: [0, [Validators.required, Validators.min(0)]],
    anomalyId: ['', Validators.maxLength(100)],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    if (!this.store.machineExists(value.machineId)) {
      this.form.controls.machineId.setErrors({ unknownMachine: true });
      this.form.controls.machineId.markAsTouched();
      return;
    }

    const correctiveDetails = new CorrectiveMaintenanceDetails({
      failure: value.failure,
      cause: value.cause,
      actionTaken: value.actionTaken,
      downtimeMinutes: value.downtimeMinutes,
    });
    this.store.addMaintenanceRecord(
      new MaintenanceRecord({
        id: crypto.randomUUID(),
        machineId: value.machineId,
        type: 'CORRECTIVE',
        performedAt: new Date(value.performedAt),
        description: new MaintenanceDescription(value.actionTaken),
        responsible: new TechnicianReference(CURRENT_TECHNICIAN_ID, value.responsibleDisplayName),
        anomalyId: value.anomalyId.trim() || null,
        correctiveDetails,
      }),
    );
    this.#router
      .navigate(['/assets/maintenance'], { queryParams: { machineId: value.machineId } })
      .then();
  }

  protected navigateToMaintenance(): void {
    this.#router.navigate(['/assets/maintenance']).then();
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
