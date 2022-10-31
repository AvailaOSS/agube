import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatches(password: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean | void } => {
    return control.value !== password.value ? { noMatched: true } : {};
  };
}
