import { ChartComponent } from './../chart.component';
import { Component, OnChanges } from '@angular/core';
import { Type } from '../chart-configure';

@Component({
    selector: 'app-gauge',
    styleUrls: ['../chart.component.scss'],
    templateUrl: '../chart.component.html',
})
export class GaugeComponent extends ChartComponent implements OnChanges {
    protected override header = ['Label', 'Value'];
    protected override type: Type = Type.gauge;

    constructor() {
        super();
    }

    public override ngOnChanges(): void {
        super.ngOnChanges();
    }
}
