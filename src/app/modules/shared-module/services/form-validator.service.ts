import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
/*All kind of form validations reusable logic can be added in this service*/
export class FormValidatorService {
  constructor() {}

  /**
   * Method used for marking As Touched to all form controls
   * @param controls - array of form controls.
   */
  public markAsTouched(controls: FormControl[]): void {
    controls.forEach((control) => {
      control.markAsTouched();
    });
  }

  /**
   * Method used for adding multiple validators to FormControls
   * If No Validators given then by default it will add Validators.required
   * @param controls - array of form controls.
   * @param validators - array of validators.
   *
   */
  public addValidators(
    controls: FormControl[],
    validators: ValidatorFn[] = [Validators.required]
  ): void {
    controls.forEach((control) => {
      validators.forEach((validator: ValidatorFn) => {
        control.setValidators([validator]);
      });

      control.updateValueAndValidity();
    });
  }

  /**
   * Method used for clearing all validators from form controls
   * If No Validators given then as by default it will add Validators.required
   * @param controls - array of form controls.
   * @OptionalParam alsoReset - is a optional field can be used if you also want to rest the FormControl .
   */
  public removeValidators(
    controls: FormControl[],
    alsoReset: boolean = true
  ): void {
    controls.forEach((control) => {
      control.clearValidators();
      if (alsoReset) {
        control.reset();
      }
      control.updateValueAndValidity();
    });
  }

  public resetControls(control: FormControl[] | FormGroup): void {
    if (control instanceof FormGroup) {
      control.reset();
    } else if (Array.isArray(control)) {
      // if it is array of form controls
      control.forEach((formControl) => {
        formControl.reset();
      });
    }
  }

  public isInvalid(control: FormControl): boolean {
    if (control.touched && control.invalid) {
      return true;
    } else {
      return false;
    }
  }
}
