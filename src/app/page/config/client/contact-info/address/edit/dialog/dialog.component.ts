import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address, UserAddress, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { DialogParameters } from './dialog-parameter';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends CreateAddress implements OnInit {
  @Output() submitClicked: EventEmitter<UserAddress> =
    new EventEmitter<UserAddress>();
  public dialogTitle: string = '';
  public address: Address | boolean;
  public userId: number | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogParameters,
    protected svcUser: UserService,
    protected svcNotification: NotificationService
  ) {
    super();
    this.address = this.data.address;
  }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.userId = this.data.userId;
    this.configureMap = this.data.configureMap;

    if (typeof this.address !== 'boolean') {
      this.inputForm.street.setValue(this.address.road);
      this.inputForm.number?.setValue(this.address.number);
      this.inputForm.flat?.setValue(this.address.flat);
      this.inputForm.gate?.setValue(this.address.gate);
    }
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public saveAddress() {
    if (!this.address) {
      return;
    }
    let updateUserAddress: UserAddress = {
      address: this.getAddress(),
      main: false,
    };
    this.submitClicked.emit(updateUserAddress);
    this.dialogRef.close();
  }
}
