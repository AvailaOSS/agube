import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactBookApiModule } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { ContactBookComponent } from './contact-book.component';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { ContactBookRoutingModule } from './contact-book-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    ContactBookApiModule,
    ContactBookRoutingModule
  ],
  declarations: [ContactBookComponent, ContactDialogComponent],
})
export class ContactBookModule {}
