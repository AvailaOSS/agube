import { Component, Input, OnChanges } from '@angular/core';
import { DwellingService } from '@availaoss/agube-rest-api';
import { DwellingMonthConsumption } from '@availaoss/agube-rest-api';
import { Configuration } from 'src/app/components/chart/chart-configure';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterGauge } from './water-meter-gauge';

@Component({
    selector: 'app-water-meter-gauge',
    styleUrls: ['./gauge.component.scss'],
    templateUrl: './gauge.component.html',
})
export class GaugeComponent implements OnChanges {
    @Input() public maxDailyConsumption: number | undefined;
    @Input() public waterMeter: WaterMeterGauge | undefined;

    public measurement: DwellingMonthConsumption | undefined;
    public configureChart: Configuration = {
        id: 'water_meter_gauge',
        options: {
            width: 500,
            height: 200,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 70,
            yellowTo: 90,
            minorTicks: 10,
        },
        data: ['', 0],
    };

    constructor(private svcDwellingService: DwellingService, private svcPersistance: WaterMeterPersistantService) {}

    ngOnChanges(): void {
        this.svcDwellingService.getDwellingMonthConsumption(this.waterMeter?.dwellingId!).subscribe((measurement) => {
            this.measurement = measurement;
            this.svcPersistance.get().subscribe(() => {
                this.computeAverage(measurement);
            });
        });
    }

    private computeAverage(measurement: DwellingMonthConsumption) {
        let total = measurement.month_consumption_percentage;

        this.configureChart = {
            id: 'water_meter_gauge',
            options: {
                width: 500,
                height: 200,
                redFrom: 90,
                redTo: 100,
                yellowFrom: 70,
                yellowTo: 90,
                minorTicks: 10,
            },
            data: [this.waterMeter!.waterMeter.code, total || 0],
        };
    }
}
