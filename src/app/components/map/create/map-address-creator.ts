import { SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Address } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { ConfigureMap } from '../map/configure-map';
import { LocationResponse } from '../map/location-response';
import { InputForm } from './input-form';

export interface MapAddressCreator {
    form: MapAddressForm | undefined;
    addressAlreadyCreated: Address[];
    addressExamples: LocationResponse[];
    resetFormIfHasChanged(formName: string, changes: SimpleChanges): void;
    loadAddressAlreadyCreatedAndDrawMap(): void;
    loadAddressExamples(option?: Address): void;
    putLocationInMap(candidate: LocationResponse, clickConf?: ConfigureMap): void;
    searchLocation(filter: string): Observable<LocationResponse[]>;
    searchLocationByCoordinate(lat: number, lon: number): Observable<LocationResponse>;
}

export interface MapAddressForm {
    filter: FormControl;
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
    reset(): void;
    clearFilter(): void;
}

export function mapAddressFormBuilder(addressInputForm: InputForm): MapAddressForm {
    if (!addressInputForm) {
        throw new Error('inputForm is necessary for this component');
    }
    var form: MapAddressForm = {
        filter: new FormControl('', Validators.required),
        country: addressInputForm.country,
        state: addressInputForm.state,
        province: addressInputForm.province,
        city: addressInputForm.city,
        village: addressInputForm.village,
        municipality: addressInputForm.municipality,
        city_district: addressInputForm.city_district,
        cp: addressInputForm.cp,
        street: addressInputForm.street,
        number: addressInputForm.number,
        flat: addressInputForm.flat,
        gate: addressInputForm.gate,
        reset() {
            this.number!.setValue('');
            this.flat!.setValue('');
            this.gate!.setValue('');
        },
        clearFilter() {
            this.filter!.setValue('');
        },
    };
    form.filter.markAsTouched();
    return form;
}

export function fillMissingAddressFields(form: MapAddressForm, location: LocationResponse): void {
    form.filter.setValue(location.display_name);

    // fill all fields
    form.country?.setValue(location.address.country);
    form.state?.setValue(location.address.state);
    form.province?.setValue(location.address.province);
    form.city?.setValue(location.address.city);
    form.village?.setValue(location.address.village);
    form.municipality?.setValue(location.address.municipality);
    form.city_district?.setValue(location.address.city_district);
    form.cp?.setValue(location.address.postcode);
    form.street?.setValue(location.address.road);
    var street = location.address.road;
    if (!street) {
        form.street?.setValue(location.address.landuse);
    }

    // fill city
    let city = location.address.city;

    if (!city) {
        if (!city) {
            city = location.address.city_district;
        }
        if (!city) {
            city = location.address.municipality;
        }
        if (!city) {
            city = location.address.province;
        }

        if (!city) {
            city = location.address.state;
        }
        if (!city) {
            city = location.address.country;
        }
        form.city.setValue(city);
    }

    // if no city_district, set city as city_district
    if (!location.address.city_district) {
        location.address.city_district = city;
        form.city_district.setValue(location.address.city_district);
    }

    // if no municipality, set city as municipality
    if (!location.address.municipality) {
        location.address.municipality = city;
        form.municipality.setValue(location.address.municipality);
    }

    // if no province, set city as province
    if (!location.address.province) {
        location.address.province = city;
        form.province.setValue(location.address.province);
    }

    // fill post code
    if (!location.address.postcode) {
        location.address.postcode = '0000';
        form.cp.setValue(location.address.postcode);
    }

    // fill number
    if (form.number && !form.number.value) {
        form.number?.setValue(location.address.house_number);
    }
}
