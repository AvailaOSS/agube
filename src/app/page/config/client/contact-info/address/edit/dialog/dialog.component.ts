import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserAddress, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends CreateAddress implements OnInit {
  @Output() submitClicked: EventEmitter<any> = new EventEmitter<any>();
  public dialogTitle: string = '';
  public address: any;
  public userId: any;
  public geolocation: any;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected svcUser: UserService,
    protected svcNotification: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.address = this.data.address;
    this.userId = this.data.userId;
    this.configureMap = this.data.configureMap;

    this.inputForm.street.setValue(this.address.road);
    this.inputForm.number?.setValue(this.address.number);
    this.inputForm.flat?.setValue(this.address.flat);
    this.inputForm.gate?.setValue(this.address.gate);
  }

  saveMessage() {
    const data = 'Your data';
    this.submitClicked.emit(data);
    this.dialogRef.close();
  }

  closeDialog() {
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
