import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingService, UserCreate } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { ChangeComponent } from '../change.component';

@Component({
    selector: 'app-change-owner',
    styleUrls: ['../change.component.scss'],
    templateUrl: '../change.component.html',
})
export class OwnerComponent extends ChangeComponent {
    constructor(
        location: Location,
        route: ActivatedRoute,
        formBuilder: FormBuilder,
        svcNotification: NotificationService,
        svcDwelling: DwellingService
    ) {
        super(location, route, formBuilder, svcNotification, svcDwelling);
        this.title = 'GENERAL.TEXT.OWNER';
    }

    override ngOnInit() {
        super.ngOnInit();
        this.loadCurrentOwner();
    }

    override saveAndExit() {
        super.save();
        this.onSave().subscribe({
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
            },
            next: (response) => {
                this.resetForm();
                this.loadingPost = false;
                this.exit();
            },
        });
    }

    private loadCurrentOwner() {
        this.svcDwelling.getCurrentOwner(this.dwellingId).subscribe((response) => (this.currentPerson = response.user));
    }

    private onSave() {
        this.loadingPost = true;
        const user: UserCreate = {
            email: this.email.value,
            first_name: this.first_name.value.toLowerCase().trim(),
            geolocation: [this.dwelling!.geolocation],
            last_name: this.last_name.value.toLowerCase().trim(),
            phones: [{ phone_number: this.phone_number.value }],
        };
        return this.svcDwelling.changeCurrentOwner(this.dwellingId, { user });
    }
}
