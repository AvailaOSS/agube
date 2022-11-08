import { FormControl, Validators } from '@angular/forms';
import { Geolocation } from '@availaoss/agube-rest-api';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { InputForm } from 'src/app/components/map/create/input-form';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { addressGenerator } from 'src/app/utils/address/address';
import { detect } from 'src/app/utils/screen/detector';
import { ResolutionType } from '../screen/type';

export class CreateAddress {
    public addressInputForm: InputForm = {
        city: new FormControl('', Validators.required),
        city_district: new FormControl('', Validators.required),
        country: new FormControl('', Validators.required),
        cp: new FormControl('', Validators.required),
        flat: new FormControl(''),
        gate: new FormControl(''),
        municipality: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        province: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        village: new FormControl(''),
    };

    public resetChildForm = false;

    // Map configuration for select Address
    public configureMap: ConfigureMap = {
        center: {
            lat: '39.92666',
            lon: '-2.33976',
            type: MapIconType.HOUSE,
        },
        dragging: false,
        height: '450px',
        id: 'create_map',
        selectOptionFilter: false,
        showMarker: false,
        zoom: 6,
    };

    public addressEmitter: AddressEmitter | undefined;

    constructor() {
        this.setMapResolution('340px', '550px', '1020px');
    }

    public addressFormReceive(addressEmitter: AddressEmitter) {
        this.addressEmitter = addressEmitter;
    }

    public getGeolocation(): Geolocation {
        if (!this.addressEmitter) {
            throw new Error('receive addressEmitter before create a new address');
        }
        return addressGenerator(this.addressEmitter);
    }

    /**
     * configure map height
     * @param fullHd '370px'
     * @param TwoK '550px'
     * @param FourK '1020px'
     */
    protected setMapResolution(fullHd: string, twoK: string, fourK: string) {
        const view: ResolutionType = detect();
        switch (view) {
            case ResolutionType.FULL_HD:
                this.configureMap.height = fullHd;
                break;
            case ResolutionType.TWO_K:
                this.configureMap.height = twoK;
                break;
            case ResolutionType.FOUR_K:
                this.configureMap.height = fourK;
                break;
            default:
                break;
        }
    }
}
