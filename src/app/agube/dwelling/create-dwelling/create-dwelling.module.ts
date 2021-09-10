import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CreateDwellingComponent } from "./create-dwelling.component";
import { NotificationModule } from "@availa/notification";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [CreateDwellingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    NotificationModule,
    NgbModule,
  ],
})
export class CreateDwellingModule {}
