import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { DwellingUtilsModule } from '../dwelling-utils/dwelling-utils.module';
import { ChangePaymasterComponent } from './change-paymaster.component';

@NgModule({
  declarations: [ChangePaymasterComponent],
  imports: [
    CommonModule,
    DwellingUtilsModule,
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
export class ChangePaymasterModule {}
