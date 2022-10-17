import { AbstractControl } from '@angular/forms';

export function getOptionalValue(formGroup: AbstractControl, extract: string) {
    let value = undefined;
    let form = formGroup.get(extract);
    if (form) {
        value = form.value;
    }
    return value;
}
