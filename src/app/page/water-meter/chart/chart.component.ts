import { Component } from '@angular/core';
import { GoogleChartComponent } from '../../../components/map/chart/google-chart.component';

@Component({
  selector: 'app-water-meter-chart',
  templateUrl: '../../../components/map/chart/google-chart.component.html',
  styleUrls: ['../../../components/map/chart/google-chart.component.scss'],
})
export class ChartComponent extends GoogleChartComponent {
  constructor() {
    super();
  }
}
