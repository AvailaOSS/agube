import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "@availa/table";
import { ComponentsModule } from "../../components/components.module";
import { WaterMeterModule } from "../water-meter/water-meter.module";
import { CreateDwellingModule } from "./create-dwelling/create-dwelling.module";
import { DwellingDetailCardComponent } from "./dwelling-detail-card/dwelling-detail-card.component";
import { DwellingManagementCard } from "./dwelling-detail-card/management-card/dwelling-management-card.component";
import { ChangePersonModule } from "./dwelling-detail-card/management-card/management-components/change-person/change-person.module";
import { WaterMeterEnabledDetailCardComponent } from "./dwelling-detail-card/water-meter-enabled-detail-card/water-meter-enabled-detail-card.component";
import { DWellingWaterMeterReadingsComponent } from "./dwelling-detail-card/water-meter-readings-detail-card/dwelling-water-meter-readings-detail-card.component";
import { DwellingDetailListComponent } from "./dwelling-detail-list/dwelling-detail-list.component";
import { DwellingComponent } from "./dwelling.component";

@NgModule({
  declarations: [
    DwellingComponent,
    DwellingDetailListComponent,
    DwellingDetailCardComponent,
    DwellingManagementCard,
    DWellingWaterMeterReadingsComponent,
    WaterMeterEnabledDetailCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CreateDwellingModule,
    ChangePersonModule,
    ComponentsModule,
    TableModule,
    WaterMeterModule,
  ],
  exports: [DwellingComponent],
})
export class DwellingModule {}
