import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ButtonsModule } from '@availa/buttons';
import { ComponentsModule } from '../../components/components.module';
import { ControlPanelComponent } from './control-panel.component';

@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FlexLayoutModule,
    ButtonsModule
  ],
  exports: [ControlPanelComponent],
})
export class ControlPanelModule {}
