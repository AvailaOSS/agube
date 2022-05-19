import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DwellingService, ResidentService, UserService } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { Detail } from '../detail';

@Component({
    selector: 'app-detail-resident',
    templateUrl: '../detail.html',
    styleUrls: ['../detail.scss'],
})
export class ResidentDetailComponent extends Detail implements OnInit {
    public title: string | undefined;
    constructor(
        private svcResident: ResidentService,
        protected override router: Router,
        protected override activatedRoute: ActivatedRoute,
        protected override svcDwelling: DwellingService,
        protected override svcUser: UserService,
        protected override svcNotification: NotificationService
    ) {
        super(router, activatedRoute, svcDwelling, svcUser, svcNotification);
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
            },
            error: (error) => this.svcNotification.warning({ message: error.error }),
        });
    }
}
