import { Component, Input, OnInit } from '@angular/core';
import { Configuration } from './chart-configure';

declare var google: any;

@Component({
  selector: 'app-google-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() config!: Configuration;

  constructor() {}

  ngOnInit(): void {
    this.drawChart();
  }

  public drawChart() {
    google.charts.load('current', { packages: ['gauge'] });

    google.charts.setOnLoadCallback(() => {
      let data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Memory', 80],
      ]);

      // Instantiate and draw our chart, passing in some options.
      let chart = new google.visualization.Gauge(
        document.getElementById(this.config.id)
      );
      chart.draw(data, this.config.options);
    });
  }
}
