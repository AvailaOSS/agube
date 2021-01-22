import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { MenuModule } from '../menu/menu.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    MenuModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  exports: [ControlPanelComponent],
})
export class ControlPanelModule {}
