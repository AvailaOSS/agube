import { FormGroup } from '@angular/forms';
import { LocationResponse } from './location-response';

export interface AddressEmitter {
  addressFormGroup: FormGroup;
  location: LocationResponse;
}
