import { Component, Input, OnInit } from '@angular/core';
import { Configuration, Type } from './chart-configure';

declare var google: any;

@Component({
  selector: 'app-google-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() config!: Configuration;

  protected type: Type | undefined;
  protected header: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.drawChart();
  }

  public drawChart() {
    google.charts.load('current', { packages: [this.type] });

    google.charts.setOnLoadCallback(() => {
      // Initialize
      let data = google.visualization.arrayToDataTable([this.header, ['', 0]]);

      // Instantiate and draw our chart, passing in some options.
      let chart = new google.visualization.Gauge(
        document.getElementById(this.config.id)
      );

      chart.draw(data, this.config.options);

      // set data received
      data = google.visualization.arrayToDataTable([
        this.header,
        this.config.data,
      ]);
      setInterval(() => {
        chart.draw(data, this.config.options);
      }, 1000);
    });
  }
}
