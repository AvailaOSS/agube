import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeResidentComponent } from './change-resident.component';
import { DwellingUtilsModule } from '../dwelling-utils/dwelling-utils.module';

@NgModule({
  declarations: [ChangeResidentComponent],
  imports: [CommonModule, DwellingUtilsModule],
})
export class ChangeResidentModule {}
