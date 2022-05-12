import { NotificationService } from '@availa/notification';
import { Component } from '@angular/core';
import { UserService, UserGeolocation } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { CreateAddress } from '../../../../../utils/address/create-address';
import { EditableGeolocation } from './edit/editable-geolocation';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../components/dialog/dialog.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
})
export class AddressComponent extends CreateAddress {
    public userId: number = -1;

    public geolocationList: EditableGeolocation[] = [];

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
            this.getGeolocationList(this.userId);
        });
    }

    public openCloseAddressForm() {
        this.canAddAddress = true;
        this.resetChildForm = true;
        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.ADD-DIALOG.TITLE',
            geolocation: this.resetChildForm,
            configureMap: this.configureMap,
            userId: this.userId,
        };
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '100%',
            data,
        });
        dialogRef.componentInstance.submitClicked.subscribe((result) => {
            this.saveAddress(result);
            dialogRef.close();
        });
    }

    public saveAddress(result: UserGeolocation) {
        this.svcUser.addUserGeolocation(this.userId, result).subscribe({
            next: (response) => {
                this.geolocationList.push({ geolocation: response, isEditable: false });
            },
            error: (error) => this.svcNotification.warning({ message: error }),
        });
    }

    public refreshAddress(geolocation: UserGeolocation | undefined) {
        if (!geolocation) {
            return;
        }

        this.getGeolocationList(this.userId);
    }

    public addressDeleted(addressId: number | undefined) {
        if (!addressId) {
            return;
        }
        const index = this.geolocationList
            .map((p) => {
                return p.geolocation.id;
            })
            .indexOf(addressId, 0);
        if (index > -1) {
            this.geolocationList.splice(index, 1);
        }
    }

    private getGeolocationList(userId: number) {
        this.svcUser.getUserGeolocation(userId).subscribe((response) => {
            this.geolocationList = response.map((geolocation) => {
                return { geolocation: geolocation, isEditable: false };
            });
        });
    }
}
