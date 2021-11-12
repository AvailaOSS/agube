import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBookComponent } from '@availa/contact-book-fe';

const routes: Routes = [
  {
    component: ContactBookComponent,
    path: 'update-book',
    outlet: 'bookPopup',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactBookRoutingModule {}
