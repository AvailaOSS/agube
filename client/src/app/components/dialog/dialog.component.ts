import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Geolocation, UserService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { CreateAddress } from 'src/app/utils/address/create-address';
import { DialogParameters } from './dialog-parameter';

@Component({
    selector: 'app-dialog',
    styleUrls: ['./dialog.component.scss'],
    templateUrl: './dialog.component.html',
})
export class DialogComponent extends CreateAddress implements OnInit {
    // Send information to close dialog
    @Output() submitClicked: EventEmitter<Geolocation | undefined> = new EventEmitter<Geolocation | undefined>();
    // Variables
    public dialogTitle: string = '';
    public geolocation: Geolocation | undefined;

    // Variable load form
    public loadEditForm: boolean = false;
    public loadCreateForm: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogParameters,
        protected svcUser: UserService,
        protected svcNotification: NotificationService
    ) {
        super();
        // load geolocation
        this.geolocation = this.data.geolocation;
    }

    ngOnInit(): void {
        // Initialize all data and load forms
        this.dialogTitle = this.data.dialogTitle;
        this.loadCreateForm = this.data.create;
        this.loadEditForm = this.data.edit;
        // set selectOptionFilter
        let config = this.data.configureMap;
        config.selectOptionFilter = this.data.configureMap.selectOptionFilter;
        this.configureMap = config;

        // Load geolocation
        if (this.geolocation) {
            this.addressInputForm.country?.setValue(this.geolocation.address.country);
            this.addressInputForm.state?.setValue(this.geolocation.address.state);
            this.addressInputForm.province?.setValue(this.geolocation.address.province);
            this.addressInputForm.city?.setValue(this.geolocation.address.city);
            this.addressInputForm.village?.setValue(this.geolocation.address.village);
            this.addressInputForm.municipality?.setValue(this.geolocation.address.municipality);
            this.addressInputForm.city_district?.setValue(this.geolocation.address.city_district);
            this.addressInputForm.cp?.setValue(this.geolocation.address.postcode);
            this.addressInputForm.street?.setValue(this.geolocation.address.road);
            this.addressInputForm.number?.setValue(this.geolocation.number);
            this.addressInputForm.flat?.setValue(this.geolocation.flat);
            this.addressInputForm.gate?.setValue(this.geolocation.gate);
        }

        this.dialogRef.keydownEvents().subscribe((event) => {
            if (event.key === 'Escape') {
                this.closeDialog();
            }
        });
    }

    public closeDialog() {
        this.submitClicked.emit(undefined);
        this.dialogRef.close();
    }

    // Save Address and close dialog
    public saveAddress() {
        let geolocation: Geolocation = this.getGeolocation();
        if (this.geolocation) {
            geolocation.id = this.geolocation.id;
        }

        this.submitClicked.emit(geolocation);
        this.dialogRef.close();
    }
}
