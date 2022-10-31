import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserDetail, DwellingService } from '@availaoss/agube-rest-api';
import { ChangeData } from 'src/app/page/person/change/change-data';
import { PersonTitle } from './person-title';

@Component({
    selector: 'app-resident',
    styleUrls: ['../info.component.scss'],
    templateUrl: './resident.component.html',
})
export class ResidentComponent implements OnInit {
    // Variables
    @Input() public dwellingId: number | undefined;
    @Input() public canLoad: boolean | undefined;

    // Variable title page
    public title: PersonTitle = {
        title: 'GENERAL.TEXT.RESIDENT',
        icon: 'resident',
    };

    public userDetail: UserDetail | undefined;

    // Variable to change string in button add or change resident or owner
    public textResidentButton: string = '';
    public textNoResidentButton: string = '';
    public textOwnerButton: string = '';

    constructor(protected svcUser: UserService, protected svcDwelling: DwellingService, protected router: Router) {}

    ngOnInit(): void {
        if (!this.dwellingId) {
            return;
        }

        // Get current resident
        this.svcDwelling.getCurrentResident(this.dwellingId).subscribe({
            next: (responseOwner) => {
                this.textResidentButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.CHANGE_RESIDENT';
                if (!responseOwner.user.id) {
                    return;
                }
                this.getUser(responseOwner.user.id);
            },
            error: () => {
                // Configure translate string to add or no resident
                this.textResidentButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.ADD_RESIDENT';
                this.textNoResidentButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.NO_RESIDENT';
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
