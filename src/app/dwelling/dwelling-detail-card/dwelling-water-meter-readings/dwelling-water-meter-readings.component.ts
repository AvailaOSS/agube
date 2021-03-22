import { Component, OnInit } from '@angular/core';
import { DWellingWaterMeterReadings } from './dwelling-water-meter-readings';

@Component({
  selector: 'app-dwelling-water-meter-readings',
  templateUrl: './dwelling-water-meter-readings.component.html',
  styleUrls: ['./dwelling-water-meter-readings.component.scss'],
})
export class DWellingWaterMeterReadingsComponent implements OnInit {
  public displayedColumns: string[] = [
    'reading',
    'date',
  ];
  public dataSource: DWellingWaterMeterReadings[];

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
