import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GoogleChartComponent } from '../../../components/chart/google-chart.component';
import { WaterMeterService } from '@availa/agube-rest-api';

@Component({
  selector: 'app-water-meter-chart',
  templateUrl: '../../../components/chart/google-chart.component.html',
  styleUrls: ['../../../components/chart/google-chart.component.scss'],
})
export class ChartComponent extends GoogleChartComponent implements OnChanges {
  constructor() {
    super();
  }
  ngOnChanges(): void {
    if (!this.googleChartConfigure) {
      return;
    }

    super.ngOnInit();
  }
}
