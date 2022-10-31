import { JoyrideModule } from 'ngx-joyride';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [MapComponent],
    imports: [CommonModule, TranslateModule, MatTooltipModule, JoyrideModule],
    exports: [MapComponent],
})
export class MapModule {}
