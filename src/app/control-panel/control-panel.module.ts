import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { MenuModule } from '../menu/menu.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { ClientDetailsCardComponent } from './detail-cards/client-details-card/client-details-card.component';
import { PresidentDetailsCardComponent } from './detail-cards/president-details-card/president-details-card.component';
import { ControlPanelButtonComponent } from './control-panel-group/control-panel-button/control-panel-button.component';
import { MatIconModule } from '@angular/material/icon';
import { ControlPanelGroupComponent } from './control-panel-group/control-panel-group.component';

@NgModule({
  declarations: [
    ControlPanelComponent,
    ClientDetailsCardComponent,
    PresidentDetailsCardComponent,
    ControlPanelButtonComponent,
    ControlPanelGroupComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    MatCardModule,
    MatButtonModule,
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
