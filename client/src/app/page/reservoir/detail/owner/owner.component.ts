import { Component, Input, OnInit } from '@angular/core';
import { UserService, ReservoirService, UserDetail } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-owner',
    styleUrls: ['../info.component.scss'],
    templateUrl: 'owner.component.html',
})
export class OwnerComponent implements OnInit {
    public title = {
        icon: 'hail',
        title: 'GENERAL.TEXT.OWNER',
    };
    public userDetail: UserDetail | undefined;
    @Input() public reservoirId: number | undefined;

    constructor(protected svcUser: UserService, protected svcReservoir: ReservoirService) {}

    public ngOnInit(): void {
        if (!this.reservoirId) {
            return;
        }
        this.svcReservoir.getCurrentReservoirOwner(this.reservoirId).subscribe((responseOwner) => {
            if (!responseOwner) {
                return;
            }
            this.svcUser.getUserDetail(responseOwner.user.id!).subscribe((response) => {
                this.userDetail = response;
            });
        });
    }
}
