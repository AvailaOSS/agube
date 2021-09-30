import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NotificationModule } from "@availa/notification";
import { ChangeResidentComponent } from "./change-resident.component";

@NgModule({
  declarations: [ChangeResidentComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    NotificationModule,
  ],
})
export class ChangeResidentModule {}
