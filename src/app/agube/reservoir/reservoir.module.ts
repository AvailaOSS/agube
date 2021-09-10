import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "@availa/table";
import { ComponentsModule } from "../../components/components.module";
import { WaterMeterModule } from "../water-meter/water-meter.module";
import { CreateReservoirModule } from "./create-reservoir/create-reservoir.module";
import { ReservoirDataComponent } from "./reservoir-detail-card/management-detail-card/reservoir-data-detail-card.component";
import { ReservoirDetailCardComponent } from "./reservoir-detail-card/reservoir-detail-card.component";
import { ReservoirWaterMeterReadingsDetailCardComponent } from "./reservoir-detail-card/reservoir-water-meter-readings-detail-card/reservoir-water-meter-readings-detail-card.component";
import { WaterMeterDetailCardComponent } from "./reservoir-detail-card/water-meter-enable-detail-card/water-meter-detail-card.component";
import { ReservoirDetailListComponent } from "./reservoir-detail-list/reservoir-detail-list.component";
import { ReservoirComponent } from "./reservoir.component";

@NgModule({
  declarations: [
    ReservoirComponent,
    ReservoirDetailListComponent,
    ReservoirDetailCardComponent,
    ReservoirDataComponent,
    WaterMeterDetailCardComponent,
    ReservoirWaterMeterReadingsDetailCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateReservoirModule,
    ComponentsModule,
    TableModule,
    WaterMeterModule,
  ],
  exports: [ReservoirComponent],
})
export class ReservoirModule {}
