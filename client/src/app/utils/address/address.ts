import { Geolocation } from '@availaoss/agube-rest-api';
import { getOptionalValue } from '../form';
import { AddressEmitter } from './address-emitter';

export function addressGenerator(emitter: AddressEmitter): Geolocation {
    const location = emitter.location;
    const addressForm = emitter.addressFormGroup;

    return {
        address: {
            city: addressForm.get('city')!.value,
            city_district: addressForm.get('city_district')!.value,
            country: addressForm.get('country')!.value,
            municipality: addressForm.get('municipality')!.value,
            postcode: addressForm.get('cp')!.value,
            province: addressForm.get('province')!.value,
            state: addressForm.get('state')!.value,
            road: addressForm.get('street')!.value,
            village: addressForm.get('village')?.value,
            is_external: false,
        },
        flat: getOptionalValue(addressForm, 'flat'),
        gate: getOptionalValue(addressForm, 'gate'),
        number: addressForm.get('number')!.value,
        latitude: location.lat,
        longitude: location.lon,
        zoom: location.zoom,
        horizontal_degree: 0,
        vertical_degree: 0,
    };
}
