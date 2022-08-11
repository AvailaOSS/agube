import { FormGroup } from '@angular/forms';
import { LocationResponse } from '../../components/map/map/location-response';

export interface AddressEmitter {
    userHasFiltered: boolean;
    addressFormGroup: FormGroup;
    location: LocationResponse;
}
