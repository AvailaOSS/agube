import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeOwnerComponent } from './change-owner.component';
import { DwellingUtilsModule } from '../dwelling-utils/dwelling-utils.module';

@NgModule({
  declarations: [ChangeOwnerComponent],
  imports: [CommonModule, DwellingUtilsModule],
})
export class ChangeOwnerModule {}
