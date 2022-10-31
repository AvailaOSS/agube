import { NotificationService } from 'src/app/components/notification/notification.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerService } from '@availaoss/agube-rest-api';
import { DetailComponent } from '../detail/detail.component';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';
import { GetPropertiesService } from '../detail/get-propierties.service';

@Component({
    selector: 'app-gauge-measurement',
    styleUrls: ['./gauge-measurement.component.scss'],
    templateUrl: './gauge-measurement.component.html',
})
export class GaugeMeasurementComponent extends DetailComponent implements OnInit {
    public maxDailyConsumption: number | undefined;

    constructor(
        protected override svcWaterMeterManager: WaterMeterManager,
        public override dialog: MatDialog,
        protected override svcWaterMeterPersistance: WaterMeterPersistantService,
        protected svcManager: ManagerService,
        public override propertiesServices: GetPropertiesService,
        public svcNotification: NotificationService
    ) {
        super(svcWaterMeterManager, dialog, svcWaterMeterPersistance, propertiesServices);
    }

    override ngOnInit(): void {
        this.svcManager
            .getManagerConfiguration()
            .subscribe((response) => (this.maxDailyConsumption = +response.max_daily_consumption));
        this.svcWaterMeterPersistance.get().subscribe((res) => {
            super.ngOnInit();
            super.waterMeterId = res?.id;
        });
    }
}
