import { Geolocation } from '@availa/agube-rest-api';
import { getOptionalValue } from '../form';
import { AddressEmitter } from './address-emitter';

export function addressGenerator(emitter: AddressEmitter): Geolocation {
    const location = emitter.location;
    const address = emitter.location.address;
    const addressForm = emitter.addressFormGroup;

    return {
        address: {
            city: address.city,
            city_district: address.city_district,
            country: address.country,
            municipality: address.municipality,
            postcode: addressForm.get('cp')!.value,
            province: address.province,
            state: address.state,
            road: addressForm.get('street')!.value,
            village: addressForm.get('village')!.value,
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
