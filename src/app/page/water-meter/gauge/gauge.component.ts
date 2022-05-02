import { Component, Input, OnInit } from '@angular/core';
import {
  ManagerConfiguration,
  ManagerService,
  WaterMeterMeasurement,
} from '@availa/agube-rest-api';
import { Configuration } from 'src/app/components/chart/chart-configure';

@Component({
  selector: 'app-water-meter-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnInit {
  @Input() public measures: WaterMeterMeasurement[] = [];

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
    data: ['', 60],
  };

  constructor(private svcManager: ManagerService) {}

  ngOnInit(): void {
    this.svcManager.getManagerConfiguration().subscribe((response) => {
      this.configureWaterMeterChart(response);
      console.log(this.measures);
    });
  }

  private configureWaterMeterChart(managerConfig: ManagerConfiguration) {
    console.log(managerConfig.max_daily_consumption);
  }
}
