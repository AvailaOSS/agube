import { NotificationService } from '@availa/notification';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService, UserAddress } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { CreateAddress } from '../../../../../utils/address/create-address';
import { EditableAddress } from './edit/editable-address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent extends CreateAddress {
  public userId: number = -1;

  public addressList: EditableAddress[] = [];

  public canAddAddress: boolean = false;

  constructor(
    protected svcNotification: NotificationService,
    protected svcAccount: AccountService,
    protected svcUser: UserService,
    protected override formBuilder: FormBuilder,
  ) {
    super(formBuilder);
    this.svcAccount.getUser().subscribe((response) => {
      this.userId = response!.user_id;
      this.getAddressList(this.userId);
    });
  }

  public openCloseAddressForm() {
    this.canAddAddress = !this.canAddAddress;
    this.resetChildForm = !this.resetChildForm;
  }

  public saveAddress() {
    let newUserAddress: UserAddress = {
      address: this.getAddress(),
      main: false,
    };

    this.svcUser.addUserAddress(this.userId, newUserAddress ).subscribe({
      next: (response) => {
        this.addressList.push({ address: response, isEditable: false });
        this.openCloseAddressForm();
      },
      error: (error) => this.svcNotification.warning({ message: error }),
    });
  }

  public refreshAddress(address: UserAddress | undefined) {
    if (!address) {
      return;
    }

    this.getAddressList(this.userId);
  }

  public addressDeleted(addressId: number | undefined) {
    if (!addressId) {
      return;
    }
    const index = this.addressList
      .map((p) => {
        return p.address.id;
      })
      .indexOf(addressId, 0);
    if (index > -1) {
      this.addressList.splice(index, 1);
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
