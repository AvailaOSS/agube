import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService, OwnerService, UserService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Detail } from '../detail';

@Component({
    selector: 'app-detail-owner',
    styleUrls: ['../detail.scss'],
    templateUrl: '../detail.html',
})
export class OwnerDetailComponent extends Detail implements OnInit {
    public title: string | undefined;
    constructor(
        private svcOwner: OwnerService,
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

        this.title = 'PAGE.PERSON.PERSON.DETAIL.TITLE-OWNER';
        this.svcOwner.getOwner(this.personId).subscribe({
            next: (owner) => {
                this.person = owner;
                this.getDwellingAndConfigureMap();
                this.getDwellingDetails();
                this.getUserPhoto(owner.user.id!);
                this.googleAnalyticsService.gtag('event', 'view_owner', {
                    dwelling_id: owner?.dwelling_id,
                    discharge_date: owner.discharge_date,
                    release_date: owner?.release_date,
                    email: owner.user?.email,
                    first_name: owner.user?.first_name,
                    geolocation: owner.user?.geolocation,
                    last_name: owner.user?.last_name,
                    phones: owner.user.phones,
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error.error });
                this.googleAnalyticsService.exception('error_view_owner', false);
            },
        });
    }
}
