import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { ClientDetailsCardComponent } from './detail-cards/client-details-card/client-details-card.component';
import { PresidentDetailsCardComponent } from './detail-cards/president-details-card/president-details-card.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ControlPanelComponent,
    ClientDetailsCardComponent,
    PresidentDetailsCardComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ComponentsModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    ControlPanelComponent,
    ClientDetailsCardComponent,
    PresidentDetailsCardComponent,
  ],
})
export class ControlPanelModule {}
