import { Component } from '@angular/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { TableReloadService } from './table/table-reload.service';

@Component({
    selector: 'app-page-dwelling-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent {
    constructor(private svcTableReload: TableReloadService) {

        }

    public waterMeterChanged(change: boolean) {
        this.svcTableReload.emitReload(change);
    }
}
