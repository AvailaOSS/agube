import { Component, Input, OnInit } from '@angular/core';
import { GoogleChartConfigure } from './google-chart-configure';
declare var google: any;

@Component({
  selector: 'app-google-chart',
  templateUrl: './google-chart.component.html',
  styleUrls: ['./google-chart.component.scss'],
})
export class GoogleChartComponent implements OnInit {
  @Input() public googleChartConfigure: GoogleChartConfigure | undefined;
  constructor() {}

  ngOnInit(): void {
    if (!this.googleChartConfigure) {
      throw new Error('id Form Component is mandatory');
    }
    this.drawChart();
  }

  drawChart() {
    google.charts.load('current', { packages: ['gauge'] });
    google.charts.setOnLoadCallback(() => {
      var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Consumo', 80],
      ]);
      if (!this.googleChartConfigure) {
        return;
      }

      let options = this.googleChartConfigure.options;

      // Instantiate and draw our chart, passing in some options.
      let chart = new google.visualization.Gauge(
        document.getElementById(this.googleChartConfigure.id)
      );
      chart.draw(data, options);
    });
  }
}
