import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ComponentsModule } from '../../components/components.module';
import { ControlPanelComponent } from './control-panel.component';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    MatCardModule,
    ComponentsModule,
    FlexLayoutModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [ControlPanelComponent],
})
export class ControlPanelModule {}
