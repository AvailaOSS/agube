import { Component, Input, OnChanges } from '@angular/core';
import { Configuration, Type } from './chart-configure';

declare var google: any;

@Component({
  selector: 'app-google-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges {
  @Input() config!: Configuration;

  protected type: Type | undefined;
  protected header: string[] = [];

  constructor() {}

  ngOnChanges(): void {
    this.drawChart();
  }

  public drawChart() {
    google.charts.load('current', { packages: [this.type] });

    google.charts.setOnLoadCallback(() => {
      // Initialize with data received
      let data = google.visualization.arrayToDataTable([
        this.header,
        this.config.data,
      ]);

      // Instantiate and draw our chart, passing in some options.
      let chart = new google.visualization.Gauge(
        document.getElementById(this.config.id)
      );

      chart.draw(data, this.config.options);
    });
  }
}
