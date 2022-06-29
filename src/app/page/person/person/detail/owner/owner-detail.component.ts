import { NotificationService } from '@availa/notification';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DwellingService, OwnerService, UserService } from '@availa/agube-rest-api';
import { Detail } from '../detail';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
    selector: 'app-detail-owner',
    templateUrl: '../detail.html',
    styleUrls: ['../detail.scss'],
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
                this.googleAnalyticsService.pageView('/owner-view', 'owner_view');
            },
            error: (error) => this.svcNotification.warning({ message: error.error }),
        });
    }
}
