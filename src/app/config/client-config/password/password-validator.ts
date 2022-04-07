import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordMatches(password: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value !== password.value ? { noMatched: true } : {};
  };
}
