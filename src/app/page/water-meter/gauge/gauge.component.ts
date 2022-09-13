import { Component, Input, OnChanges } from '@angular/core';
import { DwellingService } from '@availa/agube-rest-api';
import { DwellingWaterMonthConsumption } from '@availa/agube-rest-api/lib/model/dwellingWaterMonthConsumption';
import { differenceInDays, format } from 'date-fns';
import { Configuration } from 'src/app/components/chart/chart-configure';

import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterGauge } from './water-meter-gauge';

@Component({
    selector: 'app-water-meter-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnChanges {
    @Input() public maxDailyConsumption: number | undefined;
    @Input() public waterMeter: WaterMeterGauge | undefined;

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
        let date = format(new Date(), 'yyyy-MM-dd');

        this.svcDwellingService
            .getDwellingMonthConsumption(String(this.waterMeter?.dwellingId!), date)
            .subscribe((res) => {
                this.svcPersistance.get().subscribe(() => {
                    this.computeAverage(res);
                });
            });
    }

    private computeAverage(measurement:DwellingWaterMonthConsumption ) {
        let date = new Date();
        let dateMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate());

        let dateAccumulate = differenceInDays(date, dateMonth);
        let total = measurement.month_consumption! / dateAccumulate;

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
