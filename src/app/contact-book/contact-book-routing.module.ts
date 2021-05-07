import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBookComponent } from './contact-book.component';
import { contactBookEnumPaths } from './contact-dialog/contact-book-enum-paths';

const routes: Routes = [
  { path: contactBookEnumPaths.CONTACTBOOK, component: ContactBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class ContactBookRoutingModule {}
