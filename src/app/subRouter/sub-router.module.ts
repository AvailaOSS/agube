import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SidebarModule } from '../components/sidebar/sidebar.module';

import { SubRouterRoutingModule } from './sub-router-routing.module';
import { SubRouterComponent } from './sub-router.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [SubRouterComponent],
  imports: [
    CommonModule,
    RouterModule,
    SubRouterRoutingModule,
    SidebarModule,
    NgbModule,
  ],
  exports: [SubRouterComponent],
})
export class SubRouterModule {}
