import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Address } from '@availa/agube-rest-api';
import { AddressEmitter } from 'src/app/utils/address/address-emitter';
import { InputForm } from 'src/app/components/map/create/input-form';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
import { addressGenerator } from 'src/app/utils/address/address';

export class CreateAddress {
  public inputForm: InputForm = {
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    flat: new FormControl(''),
    gate: new FormControl(''),
  };

  public resetChildForm: boolean = false;

  // Map configuration for select Address
  public configureMap: ConfigureMap = {
    lat: 39.92666,
    lon: -2.33976,
    zoom: 6,
    showCircle: false,
    height: '500px',
  };

  public addressEmitter: AddressEmitter | undefined;

  constructor(protected formBuilder: FormBuilder) {}

  public addressFormReceive(addressEmitter: AddressEmitter) {
    this.addressEmitter = addressEmitter;
  }

  public getAddress(): Address {
    if (!this.addressEmitter) {
      throw new Error('receive addressEmitter before create a new address');
    }

    return addressGenerator(this.addressEmitter);
  }
}
