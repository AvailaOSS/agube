import { Address } from '@availa/agube-rest-api';
import { getOptionalValue } from '../form';
import { AddressEmitter } from './address-emitter';

export function addressGenerator(emitter: AddressEmitter): Address {
  const location = emitter.location;
  const address = emitter.location.address;
  const addressForm = emitter.addressFormGroup;

  return {
    city: address.city,
    city_district: address.city_district,
    country: address.country,
    geolocation: {
      latitude: location.lat,
      longitude: location.lon,
      zoom: location.zoom,
      horizontal_degree: 0,
      vertical_degree: 0,
    },
    municipality: address.municipality,
    postcode: address.postcode,
    province: address.province,
    state: address.state,
    flat: getOptionalValue(addressForm, 'flat'),
    gate: getOptionalValue(addressForm, 'gate'),
    number: addressForm.get('number')!.value,
    road: addressForm.get('street')!.value,
    village: address.village,
    is_external: false,
  };
}
