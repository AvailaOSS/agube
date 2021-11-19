import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationModule } from "@availa/notification";
import { CreateReservoirComponent } from "./create-reservoir.component";

@NgModule({
  declarations: [CreateReservoirComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
  ],
})
export class CreateReservoirModule {}
