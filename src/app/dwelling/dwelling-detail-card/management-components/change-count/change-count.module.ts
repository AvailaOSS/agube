import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCountComponent } from './change-count.component';
import { ToolbarModule } from '../../../../menu/toolbar.module';
import { UtilsModule } from '../add-welling/utils/utils.module';



@NgModule({
  declarations: [ChangeCountComponent],
  imports: [
    CommonModule,
    ToolbarModule,
    UtilsModule
  ]
})
export class ChangeCountModule { }
