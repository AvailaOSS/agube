import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeResidentComponent } from './change-resident.component';
import { ToolbarModule } from 'src/app/menu/toolbar.module';
import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [ChangeResidentComponent],

  imports: [CommonModule, ToolbarModule, UtilsModule],
})
export class ChangeResidentModule {}
