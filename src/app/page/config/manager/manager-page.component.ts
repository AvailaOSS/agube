import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-config-manager',
    templateUrl: './manager-page.component.html',
    styleUrls: ['./manager-page.component.scss'],
})
export class ManagerPageComponent implements OnInit {
    constructor(private googleAnalyticsService: GoogleAnalyticsService) {
        this.googleAnalyticsService.pageView('manager_page_view', 'manager_page_view');
    }

    ngOnInit(): void {
        this.googleAnalyticsService.event(
            'manager_page_load',
            'manager_page_load_category',
            'manager_page_load_label',
            0,
            false
        );
    }
}
