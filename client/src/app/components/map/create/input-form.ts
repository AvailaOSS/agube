import { FormControl } from '@angular/forms';

export interface InputForm {
    country: FormControl;
    state: FormControl;
    province: FormControl;
    city: FormControl;
    village?: FormControl;
    municipality: FormControl;
    city_district: FormControl;
    cp: FormControl;
    street?: FormControl;
    number?: FormControl;
    flat?: FormControl;
    gate?: FormControl;
}
