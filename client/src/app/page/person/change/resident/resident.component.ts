import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingService, UserCreate } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { ChangeComponent } from '../change.component';

@Component({
    selector: 'app-change-resident',
    styleUrls: ['../change.component.scss'],
    templateUrl: '../change.component.html',
})
export class ResidentComponent extends ChangeComponent {
    constructor(
        location: Location,
        router: Router,
        route: ActivatedRoute,
        formBuilder: FormBuilder,
        svcNotification: NotificationService,
        svcDwelling: DwellingService
    ) {
        super(location, router, route, formBuilder, svcNotification, svcDwelling);
        this.title = 'GENERAL.TEXT.RESIDENT';
    }

    override ngOnInit() {
        super.ngOnInit();
        this.loadCurrentResident();
    }

    private onSave() {
        this.loadingPost = true;
        let user: UserCreate = {
            first_name: this.first_name.value.toLowerCase().trim(),
            last_name: this.last_name.value.toLowerCase().trim(),
            email: this.email.value,
            phones: [{ phone_number: this.phone_number.value }],
        };
        return this.svcDwelling.changeCurrentResident(this.dwellingId, { user });
    }

    override saveAndExit() {
        super.save();
        this.onSave().subscribe({
            next: (response) => {
                this.resetForm();
                this.loadingPost = false;
                this.exit();
            },
            error: (error) => {
                this.svcNotification.warning({ message: error });
                this.loadingPost = false;
            },
        });
    }

    private loadCurrentResident() {
        this.svcDwelling
            .getCurrentResident(this.dwellingId)
            .subscribe((response) => (this.currentPerson = response.user));
    }
}
