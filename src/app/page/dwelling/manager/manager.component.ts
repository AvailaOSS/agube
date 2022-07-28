import { Component } from '@angular/core';
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
