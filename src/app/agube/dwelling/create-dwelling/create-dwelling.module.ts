import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DwellingUtilsModule } from '../dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';
import { CreateDwellingComponent } from './create-dwelling.component';
import { NotificationModule } from '@availa/notification';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CreateDwellingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    DwellingUtilsModule,
    NotificationModule,
    NgbModule,
  ],
})
export class CreateDwellingModule {}
