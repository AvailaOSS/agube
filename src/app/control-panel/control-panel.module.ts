import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelComponent } from './control-panel.component';
import { MenuModule } from '../menu/menu.module';



@NgModule({
  declarations: [ControlPanelComponent],
  imports: [
    CommonModule,
    MenuModule
  ],
  exports: [
    ControlPanelComponent
],
})
export class ControlPanelModule { }
