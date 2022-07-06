import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-page-config-manager',
    templateUrl: './manager-page.component.html',
    styleUrls: ['./manager-page.component.scss'],
})
export class ManagerPageComponent implements OnInit {
    constructor(private googleAnalyticsService: GoogleAnalyticsService) {}

    ngOnInit(): void {}
}
