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
    this.drawChart();
  }

  drawChart() {
    if (!this.googleChartConfigure) {
      return;
    }

    google.charts.load('current', { packages: ['gauge'] });

    google.charts.setOnLoadCallback(() => {
      let data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        [
          'Consumo',

          (+this.googleChartConfigure!.arrayToDataTable[0]
            .water_meter_measurementConsume *
            100) /
            +this.googleChartConfigure!.arrayToDataTable[0].consumeToday
              .max_daily_consumption,
        ],
      ]);

      let options = this.googleChartConfigure!.options;

      // Instantiate and draw our chart, passing in some options.
      let chart = new google.visualization.Gauge(
        document.getElementById(this.googleChartConfigure!.id)
      );
      chart.draw(data, options);
    });
  }
}
