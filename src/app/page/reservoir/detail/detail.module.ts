import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservoirRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { StreetViewModule } from 'src/app/components/map/view/view.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MapModule } from 'src/app/components/map/map/map.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { ChartModule as WaterMeterChartModule } from '../../water-meter/chart/chart.module';
import { WaterMeterModule } from '../../water-meter/water-meter.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ManagementModule } from 'src/app/components/management/management.module';
import { AddressComponent } from './address/address.component';
import { OwnerComponent } from './owner/owner.component';
import { ResidentComponent } from './resident/resident.component';

@NgModule({
  declarations: [
    DetailComponent,
    AddressComponent,
    ResidentComponent,
    OwnerComponent,
  ],
  imports: [
    CommonModule,
    ReservoirRoutingModule,
    StreetViewModule,
    MatCardModule,
    MatButtonModule,
    PipesModule,
    MapModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTooltipModule,
    TranslateModule,
    WaterMeterChartModule,
    WaterMeterModule,
    MatProgressSpinnerModule,
    ManagementModule,
  ],
})
export class DetailModule {}
