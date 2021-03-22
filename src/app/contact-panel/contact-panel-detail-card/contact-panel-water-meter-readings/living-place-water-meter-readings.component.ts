import { Component, OnInit } from '@angular/core';
import { LivingPlaceWaterMeterReadings } from './living-place-water-meter-readings';

@Component({
  selector: 'app-living-place-water-meter-readings',
  templateUrl: './living-place-water-meter-readings.component.html',
  styleUrls: ['./living-place-water-meter-readings.component.scss'],
})
export class LivingPlaceWaterMeterReadingsComponent implements OnInit {
  public displayedColumns: string[] = [
    'reading',
    'date',
  ];
  public dataSource: LivingPlaceWaterMeterReadings[];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = [
      {
        reading: '2663.93',
        date: new Date("2020-09-11"),
      },
      {
        reading: '2657.31',
        date: new Date("2020-06-22"),
      },
      {
        reading: '2645.70',
        date: new Date("2020-10-05"),
      },
      {
        reading: '2580.99',
        date: new Date("2019-09-09"),
      },
      {
        reading: '2577.06 ',
        date: new Date("2019-08-03"),
      },
    ];
  }
}
