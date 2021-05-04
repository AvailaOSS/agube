import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeResidentComponent } from './change-resident.component';
import { ToolbarModule } from 'src/app/toolbar/toolbar.module';
import { DwellingUtilsModule } from '../dwelling-utils/dwelling-utils.module';

@NgModule({
  declarations: [ChangeResidentComponent],
  imports: [CommonModule, ToolbarModule, DwellingUtilsModule],
})
export class ChangeResidentModule {}
