import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-config-client',
    templateUrl: './client-page.component.html',
    styleUrls: ['./client-page.component.scss'],
})
export class ClientPageComponent implements OnInit {
    constructor(private googleAnalyticsService: GoogleAnalyticsService) {
        this.googleAnalyticsService.pageView('client_page_view', 'client_page_view');
    }

    ngOnInit(): void {
        this.googleAnalyticsService.event(
            'client_page_load',
            'client_page_load_category',
            'client_page_load_label',
            0,
            false
        );
    }
}
