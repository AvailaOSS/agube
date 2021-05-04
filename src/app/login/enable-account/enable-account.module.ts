import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnableAccountComponent } from './enable-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  declarations: [EnableAccountComponent],
})
export class EnableAccountModule {}
