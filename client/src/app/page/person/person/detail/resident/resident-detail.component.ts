import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingService, ResidentService, UserService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Detail } from '../detail';

@Component({
    selector: 'app-detail-resident',
    styleUrls: ['../detail.scss'],
    templateUrl: '../detail.html',
})
export class ResidentDetailComponent extends Detail implements OnInit {
    public title: string | undefined;
    constructor(
        private svcResident: ResidentService,
        protected override router: Router,
        protected override activatedRoute: ActivatedRoute,
        protected override svcDwelling: DwellingService,
        protected override svcUser: UserService,
        protected override svcNotification: NotificationService,
        protected override googleAnalyticsService: GoogleAnalyticsService
    ) {
        super(router, activatedRoute, svcDwelling, svcUser, svcNotification, googleAnalyticsService);
    }

    ngOnInit(): void {
        if (!this.personId) {
            return;
        }
        this.title = 'PAGE.PERSON.PERSON.DETAIL.TITLE-RESIDENT';

        this.svcResident.getResident(this.personId).subscribe({
            next: (resident) => {
                this.person = resident;
                this.getDwellingAndConfigureMap();
                this.getDwellingDetails();
                this.getUserPhoto(resident.user.id!);
                this.googleAnalyticsService.gtag('event', 'view_resident', {
                    dwelling_id: resident?.dwelling_id,
                    discharge_date: resident.discharge_date,
                    release_date: resident?.release_date,
                    email: resident.user?.email,
                    first_name: resident.user?.first_name,
                    geolocation: resident.user?.geolocation,
                    last_name: resident.user?.last_name,
                    phones: resident.user.phones,
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error.error });
                this.googleAnalyticsService.exception('error_view_resident', false);
            },
        });
    }
}
