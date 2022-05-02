import { Component, Input, OnChanges } from '@angular/core';
import {
  WaterMeterMeasurement,
  WaterMeterWithMeasurements,
} from '@availa/agube-rest-api';
import { Configuration } from 'src/app/components/chart/chart-configure';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'app-water-meter-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnChanges {
  @Input() public maxDailyConsumption: number = 1;
  @Input() public waterMeter: WaterMeterWithMeasurements | undefined;

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
    let measures = this.waterMeter?.measures;

    if (!measures) {
      return;
    }

    let sum = 0;
    for (let index = 0; index < measures.length; index++) {
      sum += this.minusMeasure(measures[index], measures[index + 1]);
    }

    let total = ((sum / measures.length) * 100) / this.maxDailyConsumption;
    console.log(
      sum,
      measures.length,
      (sum / measures.length) * 100,
      this.maxDailyConsumption,
      total
    );

    this.configureChart.data = ['', total];
  }

  private minusMeasure(
    current: WaterMeterMeasurement,
    old: WaterMeterMeasurement
  ): number {
    if (!old) {
      old = current;
    }

    let lapsedDays = differenceInDays(
      new Date(current.date!),
      new Date(old.date!)
    );

    if (lapsedDays === 0) {
      lapsedDays = 1;
    }

    return (
      (+(+current.measurement - +old.measurement).toFixed(3) * 1000) /
      lapsedDays
    );
  }
}
