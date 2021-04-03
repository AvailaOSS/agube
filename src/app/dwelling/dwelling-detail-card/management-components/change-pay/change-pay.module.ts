import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePayComponent } from './change-pay.component';
import { UtilsModule } from '../dWellingUtils/utils.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [ChangePayComponent],
  imports: [
    CommonModule,
    UtilsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
  ],
})
export class ChangePayModule {}
