import { FormControl } from '@angular/forms';

export interface InputForm {
    cp: FormControl;
    village?: FormControl;
    street: FormControl;
    number?: FormControl;
    flat?: FormControl;
    gate?: FormControl;
}
