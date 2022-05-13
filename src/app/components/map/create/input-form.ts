import { FormControl } from '@angular/forms';

export interface InputForm {
    cp?: FormControl;
    village?: FormControl;
    municipality?: FormControl;
    state?: FormControl;
    street: FormControl;
    number?: FormControl;
    flat?: FormControl;
    gate?: FormControl;
}
