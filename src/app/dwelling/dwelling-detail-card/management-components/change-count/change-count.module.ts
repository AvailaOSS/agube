import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCountComponent } from './change-count.component';
import { UtilsModule } from '../dWellingUtils/utils.module';



@NgModule({
  declarations: [ChangeCountComponent],
  imports: [
    CommonModule,
    UtilsModule
  ]
})
export class ChangeCountModule { }
