import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserDwellingDetail } from '@availa/agube-rest-api';

@Component({
    selector: 'app-card-button',
    templateUrl: './card-button.component.html',
    styleUrls: ['./card-button.component.scss'],
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
