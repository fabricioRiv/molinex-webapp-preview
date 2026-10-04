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
import { MachineCode } from '../../../domain/model/machine-code';
import { Machine } from '../../../domain/model/machine.entity';
import { MachineStatus } from '../../../domain/model/machine-status';

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
  selector: 'app-machine-form',
  styleUrl: './machine-form.css',
  templateUrl: './machine-form.html',
})
export class MachineForm extends BaseForm {
  protected readonly store = inject(AssetMaintenanceStore);
  protected readonly statuses: readonly MachineStatus[] = [
    'OPERATIONAL',
    'REQUIRES_ATTENTION',
    'UNDER_MAINTENANCE',
    'OUT_OF_SERVICE',
  ];
  readonly #formBuilder = inject(FormBuilder);
  readonly #router = inject(Router);
  protected readonly form = this.#formBuilder.nonNullable.group({
    code: ['', [Validators.required, Validators.maxLength(30)]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    model: ['', [Validators.required, Validators.maxLength(100)]],
    status: ['OPERATIONAL' as MachineStatus, Validators.required],
    statusChangedAt: [this.#toDateTimeLocal(new Date()), Validators.required],
  });

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    if (this.store.codeExists(value.code)) {
      this.form.controls.code.setErrors({ duplicate: true });
      this.form.controls.code.markAsTouched();
      return;
    }

    this.store.addMachine(
      new Machine({
        id: crypto.randomUUID(),
        code: new MachineCode(value.code),
        name: value.name,
        model: value.model,
        status: value.status,
        statusChangedAt: new Date(value.statusChangedAt),
      }),
    );
    this.navigateToMachinery();
  }

  protected navigateToMachinery(): void {
    this.#router.navigate(['/assets/machinery']).then();
  }

  #toDateTimeLocal(date: Date): string {
    const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MILLISECONDS_PER_MINUTE;
    return new Date(date.getTime() - timezoneOffsetInMilliseconds).toISOString().slice(0, 16);
  }
}
