import { FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@availa/agube-rest-api';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { InputForm } from 'src/app/components/map/create/input-form';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
import { addressGenerator } from 'src/app/utils/address/address';

export class CreateAddress {
    public addressInputForm: InputForm = {
        cp: new FormControl('', Validators.required),
        village: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        flat: new FormControl(''),
        gate: new FormControl(''),
    };

    public resetChildForm: boolean = false;

    // Map configuration for select Address
    public configureMap: ConfigureMap = {
        id: 'create_map',
        lat: '39.92666',
        lon: '-2.33976',
        zoom: 6,
        showCircle: false,
        height: '500px',
        dragging: false,
        selectOptionFilter: false,
    };

    public addressEmitter: AddressEmitter | undefined;

    constructor() {}

    public addressFormReceive(addressEmitter: AddressEmitter) {
        this.addressEmitter = addressEmitter;
    }

    public getGeolocation(): Geolocation {
        if (!this.addressEmitter) {
            throw new Error('receive addressEmitter before create a new address');
        }

        return addressGenerator(this.addressEmitter);
    }
}
