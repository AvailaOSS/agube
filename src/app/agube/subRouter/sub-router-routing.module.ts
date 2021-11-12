import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactBookModule } from '@availa/contact-book-fe';
import { environment } from 'src/environments/environment';
import { SubRouterComponent } from './sub-router.component';

const routes: Routes = [{ path: '', component: SubRouterComponent }];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class SubRouterRoutingModule {}
