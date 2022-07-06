import { Component, Input, OnInit } from '@angular/core';
import { UserService, UserDetail, DwellingService } from '@availa/agube-rest-api';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { PersonTitle } from './person-title';

@Component({
    selector: 'app-resident',
    templateUrl: './resident.component.html',
    styleUrls: ['../info.component.scss'],
})
export class ResidentComponent implements OnInit {
    @Input() public dwellingId: number | undefined;

    public title: PersonTitle = {
        title: 'GENERAL.TEXT.RESIDENT',
        icon: 'escalator_warning',
    };
    public userDetail: UserDetail | undefined;

    constructor(
        protected svcUser: UserService,
        protected svcDwelling: DwellingService
    ) {}

    ngOnInit(): void {
        if (!this.dwellingId) {
            return;
        }
        this.svcDwelling.getCurrentResident(this.dwellingId).subscribe((response) => {
            if (!response.user.id) {
                return;
            }
            this.getUser(response.user.id);

        });
    }

    public getUser(userId: number) {
        this.svcUser.getUserDetail(userId).subscribe((response) => {
            this.userDetail = response;
        });
    }
}
