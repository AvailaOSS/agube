import { ContactBookModule } from '@availa/contact-book-fe';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import { environment } from 'src/environments/environment';
import { SubRouterRoutingModule } from './sub-router-routing.module';
import { SubRouterComponent } from './sub-router.component';

@NgModule({
  declarations: [SubRouterComponent],
  imports: [
    RouterModule,
    SubRouterRoutingModule,

  ],
  exports: [SubRouterComponent],
})
export class SubRouterModule {}
