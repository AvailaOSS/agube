import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService, UserAddress } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { NotificationService } from '@availa/notification';
import { AddressEmitter } from 'src/app/components/map/create/address-emitter';
import { InputForm } from 'src/app/components/map/create/input-form';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
import { LocationResponse } from 'src/app/components/map/map/location-response';
import { EditableAddress } from './edit/editable-address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  public userId: number = -1;
  public addressList: EditableAddress[] = [];

  public addressForm: FormGroup | undefined;

  public inputForm: InputForm = {
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    flat: new FormControl(''),
    gate: new FormControl(''),
  };

  public resetChildForm: boolean = false;
  public canAddAddress: boolean = false;

  // Map configuration for select Address
  public configureMap: ConfigureMap = {
    lat: 39.92666,
    lon: -2.33976,
    zoom: 6,
    showCircle: false,
    height: '500px',
  };

  private location: LocationResponse | undefined;

  constructor(
    protected formBuilder: FormBuilder,
    private svcAccount: AccountService,
    private svcUser: UserService
  ) {
    this.svcAccount.getUser().subscribe((response) => {
      this.userId = response!.user_id;
      this.getAddressList(this.userId);
    });
  }

  public addressFormReceive(addressEmitter: AddressEmitter) {
    this.addressForm = addressEmitter.addressFormGroup;
    this.location = addressEmitter.location;
  }

  public openCloseAddressForm() {
    this.canAddAddress = !this.canAddAddress;
    this.resetChildForm = !this.resetChildForm;
  }

  public saveAddress() {
    console.log(this.addressForm);
    // let newUserAddress: UserAddress = {
    //   main: false,
    //   full_address: {
    //     address: {
    //       street: this.street.value,
    //       town: this.town.value,
    //       is_external: false,
    //     },
    //     number: this.number.value,
    //     flat: this.flat.value,
    //     gate: this.gate.value,
    //   },
    // };
    // this.svcUser.addUserAddress(this.userId, newUserAddress).subscribe({
    //   next: (response) => {
    //     this.addressList.push({ address: response, isEditable: false });
    //     this.canAddAddress = !this.canAddAddress;
    //     this.town.setValue('');
    //     this.street.setValue('');
    //     this.number.setValue('');
    //     this.flat.setValue('');
    //     this.gate.setValue('');
    //   },
    //   error: (error) => this.svcNotification.warning({ message: error }),
    // });
  }

  public refreshAddress(address: UserAddress | undefined) {
    if (!address) {
      return;
    }

    const index = this.addressList
      .map((a) => {
        return a.address.id;
      })
      .indexOf(address.id, 0);

    if (index > -1) {
      this.addressList.splice(index, 1);
      this.addressList.push({
        address: address,
        isEditable: false,
      });
    }
  }

  public addressDeleted(addressId: number | undefined) {
    // if (!addressId) {
    //   return;
    // }
    // const index = this.addressList
    //   .map((p) => {
    //     return p.address.id;
    //   })
    //   .indexOf(addressId, 0);
    // if (index > -1) {
    //   this.addressList.splice(index, 1);
    // }
  }

  private getAddressList(userId: number) {
    this.svcUser.getUserAddress(userId).subscribe((response) => {
      this.addressList = response.map((address) => {
        return { address: address, isEditable: false };
      });
    });
  }
}
