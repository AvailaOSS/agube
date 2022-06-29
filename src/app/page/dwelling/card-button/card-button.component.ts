import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserDwellingDetail } from '@availa/agube-rest-api';
import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
    selector: 'app-card-button',
    templateUrl: './card-button.component.html',
    styleUrls: ['./card-button.component.scss'],
})
export class CardButtonComponent {
    @Input() public dwelling: UserDwellingDetail | undefined;
    @Input() public dwellingPath: string | undefined;

    constructor(private router: Router, private googleAnalyticsService: GoogleAnalyticsService) {}

    public goToDwellingDetail() {
        if (!this.dwellingPath || !this.dwelling) {
            return;
        }

        this.router.navigate([this.dwellingPath], {
            queryParams: { dwellingId: this.dwelling.id },
        });
        this.googleAnalyticsService.event(
            'dwelling_action_go_to_dwelling_detail',
            'dwelling_category_go_to_dwelling_detail',
            'dwelling_label_go_to_dwelling_detail',
            0,
            true
        );
    }
}
