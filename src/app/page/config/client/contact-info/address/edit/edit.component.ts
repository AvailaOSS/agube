import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddress, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { EditableAddress } from './editable-address';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-address-editable',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends CreateAddress {
  private infoMessage: string = 'Esta funcionalidad aún no está disponible';

  @Input() public userId: number | undefined;
  @Input() public address: EditableAddress | undefined;

  @Output() public updatedEvent: EventEmitter<UserAddress | undefined> =
    new EventEmitter<UserAddress | undefined>();
  @Output() public deleteEvent: EventEmitter<number | undefined> =
    new EventEmitter<number | undefined>();

  constructor(
    protected svcNotification: NotificationService,
    protected svcUser: UserService,
    public dialog: MatDialog
  ) {
    super();
  }

  public updateAddress() {
    if (!this.address) {
      return;
    }

    let updateUserAddress: UserAddress = {
      address: this.getAddress(),
      main: false,
    };

    this.svcUser
      .updateUserAddress(
        this.address.address.address.id!,
        this.userId!,
        updateUserAddress
      )
      .subscribe({
        next: (response) => {
          this.updatedEvent.next(updateUserAddress);
          this.address!.isEditable = !this.address!.isEditable;
        },
        error: (error) =>
          this.svcNotification.warning({
            message: error,
          }),
      });
  }

  public setAddressAsMain() {
    if (!this.address) {
      return;
    }
    this.svcNotification.info({
      message: this.infoMessage,
    });
  }

  public openEditableAddressForm() {
    if (!this.address) {
      return;
    }
    const geolocation = this.address.address.address.geolocation;
    this.configureMap = {
      lat: geolocation.latitude,
      lon: geolocation.longitude,
      zoom: geolocation.zoom,
      showCircle: true,
      height: '350px',
    };

    const address = this.address.address.address;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        dialogTitle: 'Editar Dirección',
        address: address,
        configureMap: this.configureMap,
        userId: this.userId,
      },
    });

    dialogRef.componentInstance.submitClicked.subscribe(result => {
      console.log(result)
      this.updatedEvent.next(result);
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    // this.address.isEditable = !this.address.isEditable;
  }

  public deleteAddress() {
    if (!this.address) {
      return;
    }
    this.svcUser
      .deleteUserAddress(this.address.address.address.id!, this.userId!)
      .subscribe({
        next: (response) => {
          this.deleteEvent.next(this.address!.address.id);
        },
        error: (error) =>
          this.svcNotification.warning({
            message: error,
          }),
      });
  }
}
