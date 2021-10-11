import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationModule } from "@availa/notification";
import { TableModule } from "@availa/table";
import { ComponentsModule } from "src/app/components/components.module";
import { ChangeWaterMeterComponent } from "./change-water-meter/change-water-meter.component";
import { WaterMeterReadingSetterComponent } from "./water-meter-reading-setter/water-meter-reading-setter.component";

@NgModule({
  declarations: [WaterMeterReadingSetterComponent, ChangeWaterMeterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    NotificationModule,
    ComponentsModule,
  ],
  exports: [WaterMeterReadingSetterComponent, ChangeWaterMeterComponent],
})
export class WaterMeterModule {}
