import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserGeolocation, UserService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { EditableGeolocation } from './editable-geolocation';
import { DialogComponent } from '../../../../../../components/dialog/dialog.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { Geolocation } from '@availaoss/agube-rest-api';
import { MapIconType } from 'src/app/components/map/map/configure-map';

@Component({
    selector: 'app-address-editable',
    styleUrls: ['./edit.component.scss'],
    templateUrl: './edit.component.html',
})
export class EditComponent extends CreateAddress {
    @Input() public userId: number | undefined;
    @Input() public geolocation: EditableGeolocation | undefined;

    public showMap = true;
    @Output() public updatedEvent: EventEmitter<UserGeolocation | undefined> = new EventEmitter<
        UserGeolocation | undefined
    >();
    @Output() public deleteEvent: EventEmitter<number | undefined> = new EventEmitter<number | undefined>();

    constructor(
        protected svcNotification: NotificationService,
        protected svcUser: UserService,
        public dialog: MatDialog,
        private svcTranslate: TranslateService
    ) {
        super();
    }

    public updateAddress(result: Geolocation) {
        if (!this.geolocation) {
            return;
        }

        const userAddress: UserGeolocation = {
            geolocation: result,
            main: false,
        };

        this.svcUser
            .updateUserGeolocation(this.geolocation.geolocation.geolocation.id!, this.userId!, userAddress)
            .subscribe({
                error: (error) => {
                    let message: string = JSON.stringify(error.error);

                    this.svcTranslate
                        .get('PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.ERROR')
                        .subscribe((response) => (message = response));
                    this.svcNotification.warning({ message });
                },
                next: (response) => {
                    this.updatedEvent.next(response);
                    this.geolocation!.isEditable = !this.geolocation!.isEditable;
                },
            });
    }

    public openEditableAddressForm() {
        if (!this.geolocation) {
            return;
        }

        this.showMap = false;

        const geolocation = this.geolocation.geolocation.geolocation;

        const data: DialogParameters = {
            configureMap: {
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: MapIconType.HOUSE,
                },
                dragging: false,
                height: '350px',
                id: 'edit_map',
                selectOptionFilter: true,
                showMarker: true,
                zoom: geolocation.zoom,
            },
            create: false,
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            edit: true,
            geolocation: geolocation,
        };

        const dialogRef = this.dialog.open(DialogComponent, {
            data,
            width: '100%',
        });

        dialogRef.componentInstance.submitClicked.subscribe((result: Geolocation | undefined) => {
            if (result) {
                this.updateAddress(result);
            } else {
                this.showMap = true;
            }
        });
    }

    public deleteAddress() {
        if (!this.geolocation) {
            return;
        }
        this.svcUser.deleteUserGeolocation(this.geolocation.geolocation.geolocation.id!, this.userId!).subscribe({
            error: (error) => {
                let message: string = JSON.stringify(error.error);

                this.svcTranslate
                    .get('PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.FORM.ERROR')
                    .subscribe((response) => (message = response));
                this.svcNotification.warning({ message });
            },
            next: (response) => {
                this.deleteEvent.next(this.geolocation!.geolocation.geolocation.id);
            },
        });
    }
}
