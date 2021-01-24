import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { MenuModule } from '../menu/menu.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { ClientDetailsCardComponent } from './client-details-card/client-details-card.component';
import { PresdentDetailsCardComponent } from './presdent-details-card/presdent-details-card.component';
import { ControlPanelButtonComponent } from './control-panel-button/control-panel-button.component';
import { MatIconModule } from '@angular/material/icon';
import { ControlPanelGroupComponent } from './control-panel-group/control-panel-group.component';

@NgModule({
  declarations: [
    ControlPanelComponent,
    ClientDetailsCardComponent,
    PresdentDetailsCardComponent,
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
  exports: [ControlPanelComponent],
})
export class ControlPanelModule {}
