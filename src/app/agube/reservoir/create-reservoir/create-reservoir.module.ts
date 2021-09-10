import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NotificationModule } from "@availa/notification";
import { CreateReservoirComponent } from "./create-reservoir.component";

@NgModule({
  declarations: [CreateReservoirComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NotificationModule,
  ],
})
export class CreateReservoirModule {}
