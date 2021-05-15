import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBookComponent } from './contact-book.component';
import { ContactBookRoute } from './contact-book-route';

const routes: Routes = [
  { path: ContactBookRoute.CONTACT_BOOK, component: ContactBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class ContactBookRoutingModule {}
