import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { ClientDetailCardComponent } from './toolbar-user/detail-cards/client-detail-card/client-detail-card.component';
import { ManagerDetailCardComponent } from './toolbar-user/detail-cards/manager-detail-card/manager-detail-card.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarBaseComponent } from './toolbar-base/toolbar-base.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    ClientDetailCardComponent,
    ManagerDetailCardComponent,
    ToolbarUserComponent,
    ToolbarBaseComponent,
  ],
  imports: [CommonModule, ComponentsModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
