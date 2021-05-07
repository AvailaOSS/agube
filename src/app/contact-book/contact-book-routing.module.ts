import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBookComponent } from './contact-book.component';
import { ContactBookEnumPaths } from './contact-dialog/contact-book-enum-paths';

const routes: Routes = [
  { path: ContactBookEnumPaths.CONTACTBOOK, component: ContactBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class ContactBookRoutingModule {}
