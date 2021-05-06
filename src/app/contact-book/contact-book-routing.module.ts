import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactBookComponent } from './contact-book.component';


const routes: Routes = [

  { path: 'contact-book', component: ContactBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class ContactBookRoutingModule {}
