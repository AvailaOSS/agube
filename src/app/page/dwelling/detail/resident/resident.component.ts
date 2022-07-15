import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserDetail, DwellingService } from '@availa/agube-rest-api';
import { ChangeData } from 'src/app/page/person/change/change-data';
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

    public textResidentButton: string = '';
    public textOwnerButton: string = '';

    constructor(
        protected svcUser: UserService,
        protected svcDwelling: DwellingService,
        protected router: Router,
    ) {}

    ngOnInit(): void {
        if (!this.dwellingId) {
            return;
        }

        this.svcDwelling.getCurrentResident(this.dwellingId).subscribe({
            next: (responseOwner) => {
                this.textResidentButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.CHANGE_RESIDENT';
                if (!responseOwner.user.id) {
                    return;
                }
                this.getUser(responseOwner.user.id);
            },
            error: () => {
                this.textResidentButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.ADD_RESIDENT';
            },
        });
    }

    public getUser(userId: number) {
        this.svcUser.getUserDetail(userId).subscribe((response) => {
            this.userDetail = response;
        });

    }
    public goToChangeResident() {
        let queryParams: ChangeData = {
            dwellingId: this.dwellingId!,
        };
        this.router.navigate(['manager/dwellings/person/resident'], {
            queryParams,
        });
    }

    public goToChangeOwner() {
        this.router.navigate(['manager/dwellings/person/owner'], {
            queryParams: { dwellingId: this.dwellingId },
        });
    }
}
