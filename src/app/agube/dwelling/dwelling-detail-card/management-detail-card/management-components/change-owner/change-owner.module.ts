import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DwellingUtilsModule } from '../dwelling-utils/dwelling-utils.module';
import { ChangeOwnerComponent } from './change-owner.component';

@NgModule({
  declarations: [ChangeOwnerComponent],
  imports: [CommonModule, DwellingUtilsModule],
})
export class ChangeOwnerModule {}
