import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ManagerService, WaterMeterWithMeasurements } from '@availa/agube-rest-api';
import { DetailComponent } from '../detail/detail.component';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';

@Component({
    selector: 'app-gauge-measurement',
    templateUrl: './gauge-measurement.component.html',
    styleUrls: ['./gauge-measurement.component.scss'],
})
export class GaugeMeasurementComponent extends DetailComponent implements OnInit {
    constructor(
        protected override svcWaterMeterManager: WaterMeterManager,
        public override dialog: MatDialog,
        protected override svcManager: ManagerService,
        protected override svcPersistance: WaterMeterPersistantService
    ) {
        super(svcWaterMeterManager, dialog, svcManager, svcPersistance);
    }
    override ngOnInit(): void {
        this.svcPersistance.get().subscribe((res) => {
            super.ngOnInit();
            super.waterMeterId = res?.id;
        });
    }
}
