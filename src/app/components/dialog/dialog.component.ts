import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Geolocation, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { DialogParameters } from './dialog-parameter';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent extends CreateAddress implements OnInit {
    @Output() submitClicked: EventEmitter<Geolocation | undefined> = new EventEmitter<Geolocation | undefined>();
    public dialogTitle: string = '';
    public geolocation: Geolocation | undefined;

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

        // set selectOptionFilter
        let config = this.data.configureMap;
        config.selectOptionFilter = this.data.configureMap.selectOptionFilter;
        this.configureMap = config;

        if (this.geolocation) {
            this.addressInputForm.cp?.setValue(this.geolocation.address.postcode);
            this.addressInputForm.village?.setValue(this.geolocation.address.village);
            this.addressInputForm.state?.setValue(this.geolocation.address.state);
            this.addressInputForm.municipality?.setValue(this.geolocation.address.municipality);
            this.addressInputForm.street.setValue(this.geolocation.address.road);
            this.addressInputForm.number?.setValue(this.geolocation.number);
            this.addressInputForm.flat?.setValue(this.geolocation.flat);
            this.addressInputForm.gate?.setValue(this.geolocation.gate);
        }
        this.dialogRef.keydownEvents().subscribe(event => {
            if (event.key === "Escape") {
                this.closeDialog();
            }
        });
    }

    public closeDialog() {
        this.submitClicked.emit(undefined);
        this.dialogRef.close();
    }

    public saveAddress() {
        let geolocation: Geolocation = this.getGeolocation();
        if (this.geolocation) {
            geolocation.id = this.geolocation.id;
        }

        this.submitClicked.emit(geolocation);
        this.dialogRef.close();
    }

}
