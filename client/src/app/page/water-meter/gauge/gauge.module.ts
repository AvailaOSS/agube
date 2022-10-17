import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugeComponent } from './gauge.component';
import { ChartModule } from 'src/app/components/chart/chart.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [GaugeComponent],
    imports: [CommonModule, ChartModule, TranslateModule],
    exports: [GaugeComponent],
})
export class GaugeModule {}
