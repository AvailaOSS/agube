import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserDwellingDetail } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-card-button',
    styleUrls: ['./card-button.component.scss'],
    templateUrl: './card-button.component.html',
})
export class CardButtonComponent {
    @Input() public dwelling: UserDwellingDetail | undefined;
    @Input() public dwellingPath: string | undefined;

    constructor(private router: Router) {}

    public goToDwellingDetail() {
        if (!this.dwellingPath || !this.dwelling) {
            return;
        }

        this.router.navigate([this.dwellingPath], {
            queryParams: { dwellingId: this.dwelling.id },
        });
    }
}
