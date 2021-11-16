import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SidebarModule } from '../components/sidebar/sidebar.module';

import { SubRouterRoutingModule } from './sub-router-routing.module';
import { SubRouterComponent } from './sub-router.component';

@NgModule({
  declarations: [SubRouterComponent],
  imports: [RouterModule, SubRouterRoutingModule, SidebarModule],
  exports: [SubRouterComponent],
})
export class SubRouterModule {}
