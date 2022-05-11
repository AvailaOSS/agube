import { Component, Input, OnChanges } from '@angular/core';
import { WaterMeterMeasurement } from '@availa/agube-rest-api';
import { Configuration } from 'src/app/components/chart/chart-configure';
import { WaterMeterGauge } from './water-meter-gauge';
import { differenceInDays, isBefore } from 'date-fns';

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

    constructor() {}

    ngOnChanges(): void {
        this.computeAverage();
    }

    private computeAverage() {
        if (!this.maxDailyConsumption) {
            return;
        }

        let measures = this.waterMeter?.waterMeterWithMeasure?.measures;

        if (!measures) {
            return;
        }

        let sum = 0;
        for (let index = 0; index < measures.length; index++) {
            sum += this.minusMeasure(measures[index], measures);
        }

        let total = ((sum / measures.length) * 100) / this.maxDailyConsumption;

        if (this.waterMeter?.waterMeter === undefined) {
            this.waterMeter = {
                waterMeter: {
                    code: this.waterMeter!.waterMeterWithMeasure.code!,
                    discharge_date: this.waterMeter?.waterMeterWithMeasure.discharge_date,
                    release_date: this.waterMeter?.waterMeterWithMeasure.release_date,
                },
                waterMeterWithMeasure: this.waterMeter!.waterMeterWithMeasure,
            };
        }
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
            data: [this.waterMeter!.waterMeter.code, total],
        };
    }

    public minusMeasure(current: WaterMeterMeasurement, data: WaterMeterMeasurement[]): number {
        let currentDate = new Date(current.date!);

        const previousWaterMeterMeasurement = data.filter(
            (x) => isBefore(new Date(x.date!), currentDate) && differenceInDays(new Date(x.date!), currentDate) < 0
        )[0];

        if (!previousWaterMeterMeasurement) {
            return 0;
        }

        let lapsedDays = differenceInDays(new Date(current.date!), new Date(previousWaterMeterMeasurement.date!));

        if (lapsedDays === 0) {
            lapsedDays = 1;
        }

        return (+(+current.measurement - +previousWaterMeterMeasurement.measurement).toFixed(3) * 1000) / lapsedDays;
    }
}
