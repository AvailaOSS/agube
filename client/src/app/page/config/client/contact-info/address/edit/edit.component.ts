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

    public showMap: boolean = true;
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

        let userAddress: UserGeolocation = {
            geolocation: result,
            main: false,
        };

        this.svcUser
            .updateUserGeolocation(this.geolocation.geolocation.geolocation.id!, this.userId!, userAddress)
            .subscribe({
                next: (response) => {
                    this.updatedEvent.next(response);
                    this.geolocation!.isEditable = !this.geolocation!.isEditable;
                },
                error: (error) => {
                    let message: string = JSON.stringify(error.error);

                    this.svcTranslate
                        .get('PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.ERROR')
                        .subscribe((response) => (message = response));
                    this.svcNotification.warning({ message });
                },
            });
    }

    public openEditableAddressForm() {
        if (!this.geolocation) {
            return;
        }

        this.showMap = false;

        const geolocation = this.geolocation.geolocation.geolocation;

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: geolocation,
            configureMap: {
                id: 'edit_map',
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: MapIconType.HOUSE,
                },
                zoom: geolocation.zoom,
                showMarker: true,
                height: '350px',
                dragging: false,
                selectOptionFilter: true,
            },
            create: false,
            edit: true,
        };

        const dialogRef = this.dialog.open(DialogComponent, {
            width: '100%',
            data,
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
            next: (response) => {
                this.deleteEvent.next(this.geolocation!.geolocation.geolocation.id);
            },
            error: (error) => {
                let message: string = JSON.stringify(error.error);

                this.svcTranslate
                    .get('PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.FORM.ERROR')
                    .subscribe((response) => (message = response));
                this.svcNotification.warning({ message });
            },
        });
    }
}
