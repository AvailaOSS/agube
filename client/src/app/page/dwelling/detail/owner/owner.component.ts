import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, DwellingService } from '@availaoss/agube-rest-api';
import { ResidentComponent } from '../resident/resident.component';

@Component({
    selector: 'app-owner',
    styleUrls: ['../info.component.scss'],
    templateUrl: '../resident/resident.component.html',
})
export class OwnerComponent extends ResidentComponent implements OnInit {
    override textOwnerButton: string = '';
    override title = {
        title: 'GENERAL.TEXT.OWNER',
        icon: 'hail',
    };

    constructor(
        protected override svcUser: UserService,
        protected override svcDwelling: DwellingService,
        protected override router: Router
    ) {
        super(svcUser, svcDwelling, router);
    }

    public override  ngOnInit(): void {
        if (!this.dwellingId) {
            return;
        }
        this.svcDwelling.getCurrentOwner(this.dwellingId).subscribe({
            next: (responseOwner) => {
                if (!responseOwner.user.id) {
                    return;
                }
                this.getUser(responseOwner.user.id);
                this.textOwnerButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.CHANGE_OWNER';
            },
            error: () => {
                this.textOwnerButton = 'PAGE.DWELLING.DETAIL.MANAGEMENT.BUTTON.ADD_OWNER';
            },
        });
    }
}
