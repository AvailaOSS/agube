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
            is_external: false,
            municipality: addressForm.get('municipality')!.value,
            postcode: addressForm.get('cp')!.value,
            province: addressForm.get('province')!.value,
            road: addressForm.get('street')!.value,
            state: addressForm.get('state')!.value,
            village: addressForm.get('village')?.value,
        },
        flat: getOptionalValue(addressForm, 'flat'),
        gate: getOptionalValue(addressForm, 'gate'),
        horizontal_degree: 0,
        latitude: location.lat,
        longitude: location.lon,
        number: addressForm.get('number')!.value,
        vertical_degree: 0,
        zoom: location.zoom,
    };
}
