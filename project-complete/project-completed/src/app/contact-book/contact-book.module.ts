import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContactBookComponent } from './contact-book.component';
import { MenuModule } from '../menu/menu.module';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MenuModule,
    MatDialogModule
  ],
  declarations: [ContactBookComponent, ContactDialogComponent],
})
export class ContactBookModule {}
