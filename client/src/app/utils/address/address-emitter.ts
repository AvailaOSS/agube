import { FormGroup } from '@angular/forms';
import { LocationResponse } from '../../components/map/map/location-response';

export interface AddressEmitter {
    userHasMapClicked: boolean;
    addressFormGroup: FormGroup;
    location: LocationResponse;
}
