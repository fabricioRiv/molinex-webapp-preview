import { FormGroup } from '@angular/forms';

export class BaseForm {
  protected isInvalidControl(form: FormGroup, controlName: string): boolean {
    const control = form.controls[controlName];
    return control.invalid && control.touched;
  }
}
