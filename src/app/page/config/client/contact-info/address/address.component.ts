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
import { EditableAddress } from './edit/editable-address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent {
  public userId: number = -1;
  public addressList: EditableAddress[] = [];
  public canAddAddress: boolean = false;

  public fullAddressForm: FormGroup;
  public town = new FormControl('', [Validators.required]);
  public street = new FormControl('', [Validators.required]);
  public number = new FormControl('', [Validators.required]);
  public flat = new FormControl('', []);
  public gate = new FormControl('', []);

  constructor(
    protected formBuilder: FormBuilder,
    private svcAccount: AccountService,
    private svcUser: UserService,
    private svcNotification: NotificationService
  ) {
    this.fullAddressForm = formBuilder.group({
      address: formBuilder.group({
        town: this.town,
        street: this.street,
      }),
      number: this.number,
      flat: this.flat,
      gate: this.gate,
    });
    this.svcAccount.getUser().subscribe((response) => {
      this.userId = response!.user_id;
      this.getAddressList(this.userId);
    });
  }

  public openCloseAddressForm() {
    this.canAddAddress = !this.canAddAddress;
  }

  public saveAddress() {
    if (this.fullAddressForm.invalid) {
      return;
    }

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

  public errorValidator(entity: string) {
    switch (entity) {
      case 'number':
        if (this.number.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.NUMBER';
        }
        return '';
      case 'street':
        if (this.street.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.STREET';
        }
        return '';
      case 'town':
        if (this.town.hasError('required')) {
          return 'CONTACT_INFO.ADDRESS.FORM.VALIDATIONS.TOWN';
        }
        return '';
      default:
        return '';
    }
  }

  private getAddressList(userId: number) {
    this.svcUser.getUserAddress(userId).subscribe((response) => {
      this.addressList = response.map((address) => {
        return { address: address, isEditable: false };
      });
    });
  }
}
