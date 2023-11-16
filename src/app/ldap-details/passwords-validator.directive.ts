import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted: boolean | null = form && form.submitted;
    return !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      (control.touched || isSubmitted)
    );
  }
  passwordMatchingValidator = (control: AbstractControl) => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm Password');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMatching: true };
  };
}
