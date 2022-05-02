import { Component, OnChanges } from '@angular/core';
import { ManagerConfiguration, ManagerService } from '@availa/agube-rest-api';
import { Configuration } from 'src/app/components/chart/chart-configure';

@Component({
  selector: 'app-water-meter-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss'],
})
export class GaugeComponent implements OnChanges {
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
  };

  constructor(private svcManager: ManagerService) {}

  ngOnChanges(): void {
    this.svcManager.getManagerConfiguration().subscribe((response) => {
      this.configureWaterMeterCharts(response);
    });
  }

  private configureWaterMeterCharts(consumption: ManagerConfiguration) {}
}
