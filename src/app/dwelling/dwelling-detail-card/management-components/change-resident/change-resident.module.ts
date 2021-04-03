import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeResidentComponent } from './change-resident.component';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';
import { UtilsModule } from '../dWellingUtils/utils.module';

@NgModule({
  declarations: [ChangeResidentComponent],

  imports: [CommonModule, ToolbarModule, UtilsModule],
})
export class ChangeResidentModule {}
