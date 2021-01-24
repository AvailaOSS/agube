import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { MenuModule } from '../menu/menu.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    MenuModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
  ],
  exports: [ControlPanelComponent],
})
export class ControlPanelModule {}
