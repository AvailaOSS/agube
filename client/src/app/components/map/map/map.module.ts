import { JoyrideModule } from 'ngx-joyride';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [MapComponent],
    exports: [MapComponent],
    imports: [CommonModule, JoyrideModule, MatTooltipModule, TranslateModule],
})
export class MapModule {}
