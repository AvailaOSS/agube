import { NotificationService } from 'src/app/components/notification/notification.service';
import { Component } from '@angular/core';
import { UserService, UserGeolocation } from '@availaoss/agube-rest-api';
import { CreateAddress } from '../../../../../utils/address/create-address';
import { EditableGeolocation } from './edit/editable-geolocation';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../../../components/dialog/dialog.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { Geolocation } from '@availaoss/agube-rest-api';
import { AccountService } from 'src/app/page/auth/login/service/account.service';

@Component({
    selector: 'app-address',
    styleUrls: ['./address.component.scss'],
    templateUrl: './address.component.html',
})
export class AddressComponent extends CreateAddress {
    public userId = -1;

    public geolocationList: EditableGeolocation[] = [];

    public canAddAddress = false;

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

        const data: DialogParameters = {
            configureMap: this.configureMap,
            create: true,
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.ADD-DIALOG.TITLE',
            edit: false,
        };

        const dialogRef = this.dialog.open(DialogComponent, {
            data,
            width: '100%',
        });

        dialogRef.componentInstance.submitClicked.subscribe((result: Geolocation | undefined) => {
            if (result) {
                this.saveAddress(result);
            }
        });
    }

    public saveAddress(result: Geolocation) {
        const userAddress: UserGeolocation = {
            geolocation: result,
            main: false,
        };

        this.svcUser.addUserGeolocation(this.userId, userAddress).subscribe({
            error: (error) => this.svcNotification.warning({ message: error }),
            next: (response) => {
                this.geolocationList.push({ geolocation: response, isEditable: false });
            },
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
                return p.geolocation.geolocation.id;
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
