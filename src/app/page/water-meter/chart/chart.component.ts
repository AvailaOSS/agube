import { Component, OnChanges } from '@angular/core';
import { GoogleChartComponent } from '../../../components/chart/google-chart.component';

@Component({
  selector: 'app-water-meter-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
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
