import { AbstractControl } from '@angular/forms';

export function getOptionalValue(formGroup: AbstractControl, extract: string) {
    let value = undefined;
    const form = formGroup.get(extract);
    if (form) {
        value = form.value;
    }
    return value;
}
