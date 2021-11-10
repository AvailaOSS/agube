import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NotificationModule } from "@availa/notification";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CreateDwellingComponent } from "./create-dwelling.component";

@NgModule({
  declarations: [CreateDwellingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NotificationModule,
    NgbModule,
  ],
})
export class CreateDwellingModule {}
