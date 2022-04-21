import { FormGroup } from '@angular/forms';
import { LocationResponse } from '../map/location-response';

export interface AddressEmitter {
  addressFormGroup: FormGroup;
  location: LocationResponse;
}
