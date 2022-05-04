import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Geolocation, UserGeolocation, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { Observable } from 'rxjs';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { DialogParameters } from './dialog-parameter';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends CreateAddress implements OnInit {
  @Output() submitClicked: EventEmitter<UserGeolocation> =
    new EventEmitter<UserGeolocation>();
  public dialogTitle: string = '';
  public geolocation: Geolocation | boolean;
  public userId: number | undefined;

  myControl = new FormControl();
  optionsName: string[] = ['One', 'Two', 'Three'];
  public filteredOptions: Observable<string[]> = new Observable();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogParameters,
    protected svcUser: UserService,
    protected svcNotification: NotificationService
  ) {
    super();
    this.geolocation = this.data.geolocation;
  }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.userId = this.data.userId;
    this.configureMap = this.data.configureMap;



    if (typeof this.geolocation !== 'boolean') {
      this.inputForm.street.setValue(this.geolocation.address.road);
      this.inputForm.number?.setValue(this.geolocation.number);
      this.inputForm.flat?.setValue(this.geolocation.flat);
      this.inputForm.gate?.setValue(this.geolocation.gate);
    }
  }


  public closeDialog() {
    this.dialogRef.close();
  }

  public saveAddress() {
    if (!this.geolocation) {
      return;
    }
    let updateUserAddress: UserGeolocation = {
      geolocation: this.getGeolocation(),
      main: false,
    };
    this.submitClicked.emit(updateUserAddress);
    this.dialogRef.close();
  }
}
