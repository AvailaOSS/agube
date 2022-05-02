import { NotificationService } from '@availa/notification';
import { Component } from '@angular/core';
import { UserService, UserAddress, Address } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { CreateAddress } from '../../../../../utils/address/create-address';
import { EditableAddress } from './edit/editable-address';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './edit/dialog/dialog.component';
import { DialogParameters } from './edit/dialog/dialog-parameter';

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
    public dialog: MatDialog
  ) {
    super();
    this.svcAccount.getUser().subscribe((response) => {
      if (!response) {
        return;
      }
      this.userId = response!.user_id;
      this.getAddressList(this.userId);
    });
  }

  public openCloseAddressForm() {
    this.canAddAddress = true;
    this.resetChildForm = true;
    let data: DialogParameters = {
      dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.ADD-DIALOG.TITLE',
      address: this.resetChildForm,
      configureMap: this.configureMap,
      userId: this.userId,
    };
    const dialogRef = this.dialog.open(DialogComponent, {
      data,
    });
    dialogRef.componentInstance.submitClicked.subscribe((result) => {
      this.saveAddress(result);
      dialogRef.close();
    });
  }

  public saveAddress(result: UserAddress) {
    this.svcUser.addUserAddress(this.userId, result).subscribe({
      next: (response) => {
        this.addressList.push({ address: response, isEditable: false });
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
