import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonsModule } from '@availa/buttons';
import { ComponentsModule } from '../../components/components.module';
import { ControlPanelComponent } from './control-panel.component';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ButtonsModule
  ],
  exports: [ControlPanelComponent],
})
export class ControlPanelModule {}
