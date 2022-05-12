import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserGeolocation, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { EditableGeolocation } from './editable-geolocation';
import { DialogComponent } from '../../../../../../components/dialog/dialog.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';

@Component({
    selector: 'app-address-editable',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
})
export class EditComponent extends CreateAddress {
    private infoMessage: string = 'Esta funcionalidad aún no está disponible';

    @Input() public userId: number | undefined;
    @Input() public geolocation: EditableGeolocation | undefined;

    @Output() public updatedEvent: EventEmitter<UserGeolocation | undefined> = new EventEmitter<
        UserGeolocation | undefined
    >();
    @Output() public deleteEvent: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();

    constructor(
        protected svcNotification: NotificationService,
        protected svcUser: UserService,
        public dialog: MatDialog
    ) {
        super();
    }

    public updateAddress(result: UserGeolocation) {
        if (!this.geolocation) {
            return;
        }
        this.svcUser
            .updateUserGeolocation(this.geolocation.geolocation.geolocation.id!, this.userId!, result)
            .subscribe({
                next: (response) => {
                    this.updatedEvent.next(response);
                    this.geolocation!.isEditable = !this.geolocation!.isEditable;
                },
                error: (error) =>
                    this.svcNotification.warning({
                        message: error,
                    }),
            });
    }

    public setAddressAsMain() {
        if (!this.geolocation) {
            return;
        }
        this.svcNotification.info({
            message: this.infoMessage,
        });
    }

    public openEditableAddressForm() {
        if (!this.geolocation) {
            return;
        }

        const geolocation = this.geolocation.geolocation.geolocation;

        this.configureMap = {
            id: 'edit_map',
            lat: geolocation.latitude,
            lon: geolocation.longitude,
            zoom: geolocation.zoom,
            showCircle: true,
            height: '350px',
            dragging: false,
            selectOptionFilter:true
        };

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: this.geolocation.geolocation.geolocation,
            configureMap: this.configureMap,
            userId: this.userId!,
        };
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '100%',
            data,
        });

        dialogRef.componentInstance.submitClicked.subscribe((result) => {
            this.updateAddress(result);
            dialogRef.close();
        });
    }

    public deleteAddress() {
        if (!this.geolocation) {
            return;
        }
        this.svcUser.deleteUserGeolocation(this.geolocation.geolocation.geolocation.id!, this.userId!).subscribe({
            next: (response) => {
                this.deleteEvent.next(this.geolocation!.geolocation.geolocation.id);
            },
            error: (error) =>
                this.svcNotification.warning({
                    message: error,
                }),
        });
    }
}
