import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { GenericFormsComponent } from './generic-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GenericFormsComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserModule],
  exports: [GenericFormsComponent],
})
export class GenericFormsModule {}
