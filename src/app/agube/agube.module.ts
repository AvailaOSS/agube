import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AgubeApiModule } from '@availa/agube-rest-api';
import { AgubeRoutingModule } from './agube-routing.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DwellingModule } from './dwelling/dwelling.module';
import { ReservoirModule } from './reservoir/reservoir.module';
import { WaterMeterModule } from './water-meter/water-meter.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgubeApiModule,
    WaterMeterModule,
    DwellingModule,
    ReservoirModule,
    ConfigurationModule,
    AgubeRoutingModule,
  ],
})
export class AgubeModule {}
