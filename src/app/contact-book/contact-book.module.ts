import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactBookComponent } from './contact-book.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [ContactBookComponent, ContactDialogComponent],
})
export class ContactBookModule {}
