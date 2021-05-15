import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DwellingUtilsModule } from '../dwelling-utils/dwelling-utils.module';
import { ChangeResidentComponent } from './change-resident.component';

@NgModule({
  declarations: [ChangeResidentComponent],
  imports: [CommonModule, DwellingUtilsModule],
})
export class ChangeResidentModule {}
