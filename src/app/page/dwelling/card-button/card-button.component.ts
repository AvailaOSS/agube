import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDwellingDetail } from '@availa/agube-rest-api';
import { ClientComponent } from '../client/client.component';

@Component({
    selector: 'app-card-button',
    templateUrl: './card-button.component.html',
    styleUrls: ['./card-button.component.scss'],
})
export class CardButtonComponent implements OnInit {
    @Input() public dwelling: UserDwellingDetail | undefined;

    constructor(private router: Router) {}

    ngOnInit(): void {}

    public goToDwellingDetail(dwelling: UserDwellingDetail) {
        console.log(this.router)
        this.routeString(this.router.url + ClientComponent.UrlStringClient, dwelling);
    }

    private routeString(route: string, dwelling: UserDwellingDetail) {
        return this.router.navigate([route], {
            queryParams: { dwellingId: dwelling.id },
        });
    }
}
