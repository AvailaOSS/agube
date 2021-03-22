import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePayComponent } from './change-pay.component';
import { ToolbarModule } from '../../../../menu/toolbar.module';
import { UtilsModule } from '../add-welling/utils/utils.module';



@NgModule({
  declarations: [ChangePayComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    UtilsModule
  ]
})
export class ChangePayModule { }
