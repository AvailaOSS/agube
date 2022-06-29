import { Component, Input, OnInit } from '@angular/core';
import { UserService, ReservoirService, UserDetail } from '@availa/agube-rest-api';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
    selector: 'app-owner',
    templateUrl: 'owner.component.html',
    styleUrls: ['../info.component.scss'],
})
export class OwnerComponent implements OnInit {
    public title = {
        title: 'GENERAL.TEXT.OWNER',
        icon: 'hail',
    };
    public userDetail: UserDetail | undefined;
    @Input() public reservoirId: number | undefined;

    constructor(
        protected svcUser: UserService,
        protected svcReservoir: ReservoirService,
        protected googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.googleAnalyticsService.pageView('/owner-reservoir-view', 'owner_reservoir_view');
    }

    ngOnInit(): void {
        if (!this.reservoirId) {
            return;
        }
        this.svcReservoir.getCurrentReservoirOwner(this.reservoirId).subscribe((responseOwner) => {
            if (!responseOwner) {
                return;
            }
            this.svcUser.getUserDetail(responseOwner.user.id!).subscribe((response) => {
                this.userDetail = response;
                this.googleAnalyticsService.event(
                    'reservoir_action',
                    'reservoir_category',
                    'reservoir_label',
                    0,
                    false
                );
            });
        });
    }
}
