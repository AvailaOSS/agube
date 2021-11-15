import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationModule } from "@availa/notification";
import { ChangeOwnerComponent } from "./change-owner/change-owner.component";
import { ChangePersonComponent } from "./change-person.component";
import { ChangeResidentComponent } from "./change-resident/change-resident.component";

@NgModule({
  declarations: [
    ChangePersonComponent,
    ChangeResidentComponent,
    ChangeOwnerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NotificationModule,
  ],
})
export class ChangePersonModule {}
