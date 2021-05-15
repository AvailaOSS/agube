import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBookRoute } from './contact-book-route';
import { ContactBookComponent } from './contact-book.component';

const routes: Routes = [
  { path: ContactBookRoute.CONTACT_BOOK, component: ContactBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ContactBookRoutingModule {}
