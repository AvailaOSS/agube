import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NotificationModule } from "@availa/notification";
import { ChangePaymasterComponent } from "./change-paymaster.component";

@NgModule({
  declarations: [ChangePaymasterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    NotificationModule,
  ],
})
export class ChangePaymasterModule {}
