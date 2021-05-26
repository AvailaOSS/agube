import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactBookApiModule } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { ContactBookRoutingModule } from './contact-book-routing.module';
import { ContactBookComponent } from './contact-book.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ContactBookApiModule,
    ContactBookRoutingModule,
  ],
  declarations: [ContactBookComponent],
})
export class ContactBookModule {}
