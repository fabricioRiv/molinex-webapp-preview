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
import { MaintenanceDescription } from '../../../domain/model/maintenance-description';
import { MaintenanceRecord } from '../../../domain/model/maintenance-record.entity';
import { TechnicianReference } from '../../../domain/model/technician-reference';

const CURRENT_TECHNICIAN_ID = 'b3d36b83-013b-4655-ad0c-574704f0945e';
const DEFAULT_SCHEDULE_OFFSET_DAYS = 1;
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
  selector: 'app-preventive-maintenance-form',
  styleUrl: './preventive-maintenance-form.css',
  templateUrl: './preventive-maintenance-form.html',
})
export class PreventiveMaintenanceForm extends BaseForm {
  protected readonly store = inject(AssetMaintenanceStore);
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  protected readonly form = this.#formBuilder.nonNullable.group({
    machineId: ['', Validators.required],
    performedAt: [this.#defaultSchedule(), Validators.required],
    responsibleDisplayName: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
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

    this.store.addMaintenanceRecord(
      new MaintenanceRecord({
        id: crypto.randomUUID(),
        machineId: value.machineId,
        type: 'PREVENTIVE',
        performedAt: new Date(value.performedAt),
        description: new MaintenanceDescription(value.description),
        responsible: new TechnicianReference(CURRENT_TECHNICIAN_ID, value.responsibleDisplayName),
      }),
    );
    this.navigateToMaintenance();
  }

  protected navigateToMaintenance(): void {
    this.#router.navigate(['/assets/maintenance']).then();
  }

  #defaultSchedule(): string {
    const date = new Date();
    date.setDate(date.getDate() + DEFAULT_SCHEDULE_OFFSET_DAYS);
    date.setHours(8, 0, 0, 0);
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
