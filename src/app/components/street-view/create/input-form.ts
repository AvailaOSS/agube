import { FormControl } from '@angular/forms';

export interface InputForm {
  street: FormControl;
  number?: FormControl;
  flat?: FormControl;
  gate?: FormControl;
}
