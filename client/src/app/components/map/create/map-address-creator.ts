import { SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Address } from '@availaoss/agube-rest-api';
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
    const form: MapAddressForm = {
        city: addressInputForm.city,
        city_district: addressInputForm.city_district,
        country: addressInputForm.country,
        cp: addressInputForm.cp,
        filter: new FormControl('', Validators.required),
        flat: addressInputForm.flat,
        gate: addressInputForm.gate,
        municipality: addressInputForm.municipality,
        number: addressInputForm.number,
        province: addressInputForm.province,
        state: addressInputForm.state,
        street: addressInputForm.street,
        village: addressInputForm.village,
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
    // fill all fields
    form.city.setValue(location.address.city);
    form.city_district.setValue(location.address.city_district);
    form.country.setValue(location.address.country);
    form.cp.setValue(location.address.postcode);
    form.municipality.setValue(location.address.municipality);
    form.province.setValue(location.address.province);
    form.state.setValue(location.address.state);
    form.street?.setValue(location.address.road);
    form.village?.setValue(location.address.village);
    const street = location.address.road;

    if (!street) {
        form.street?.setValue(location.address.landuse);
        form.street?.setErrors({ check: true });
        form.street?.markAsTouched();
    }

    // fill city
    let city = location.address.city;
    if (!city && location.address.county) {
        city = location.address.county;
        form.city.setValue(city);
    }

    if (!city) {
        city = location.address.city_district;

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
        form.city.setErrors({ check: true });
        form.city.markAsTouched();
    }

    // if no city_district, set city as city_district
    if (!location.address.city_district) {
        location.address.city_district = city;
        form.city_district.setValue(location.address.city_district);
        form.city_district.setErrors({ check: true });
        form.city_district.markAsTouched();
    }

    // if no province, set city as province
    if (!location.address.province) {
        location.address.province = city;
        form.province.setValue(location.address.province);
        form.province.setErrors({ check: true });
        form.province.markAsTouched();
    }

    // if no municipality, set city as municipality
    if (!location.address.municipality) {
        location.address.municipality = city;
        form.municipality.setValue(location.address.municipality);
        form.municipality.setErrors({ check: true });
        form.municipality.markAsTouched();
    }

    // fill post code
    if (!location.address.postcode) {
        location.address.postcode = '0000';
        form.cp.setValue(location.address.postcode);
    }

    form.cp.setErrors({ check: true });
    form.cp.markAsTouched();

    // fill number
    if (form.number && !form.number.value) {
        form.number.setValue(location.address.house_number);
    }

    if (form.number?.errors?.['required']) {
        form.number?.setErrors({ check: true });
        form.number?.markAsTouched();
    }
}
