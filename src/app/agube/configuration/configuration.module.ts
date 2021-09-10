import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotificationModule } from "@availa/notification";
import { ConfigurationComponent } from "./configuration.component";
import { ParametersConfigComponent } from "./parameters-config/parameters-config.component";
import { PasswordConfigComponent } from "./password-config/password-config.component";

@NgModule({
  declarations: [
    ParametersConfigComponent,
    PasswordConfigComponent,
    ConfigurationComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NotificationModule],
})
export class ConfigurationModule {}
