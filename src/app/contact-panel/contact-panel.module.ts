import { ContactPanelDetailListComponent } from './contact-panel-detail-list/contact-panel-detail-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ControlPanelModule } from '../control-panel/control-panel.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {  ContactPanelComponent } from './contact-panel.component';
import { ContactPanelDetailCardComponent } from './contact-panel-detail-card/contact-panel-detail-card.component';
import { ContactPanelManagementComponent } from './contact-panel-detail-card/contact-panel-management/contact-panel-management.component';

@NgModule({
  declarations: [
    ContactPanelComponent,
    ContactPanelDetailListComponent,
    ContactPanelDetailCardComponent,
    ContactPanelManagementComponent,
    // ContactPanelWaterMeterReadingsComponent,
    // WaterMeterDetailCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    ControlPanelModule,
    MatCardModule,
  ],
  exports: [ContactPanelComponent],
})
export class ContactPanelModule {}
