import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationModule } from '@availa/notification';
import { ConfigurationComponent } from './configuration.component';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  NotificationModule],
})
export class ConfigurationModule {}
