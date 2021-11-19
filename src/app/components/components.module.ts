import { NgModule } from '@angular/core';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutoFocusDirective } from './directives/auto-focus.directive';
import { FullAddressPipe } from './pipes/fulladdress.pipe';
import { UserDetailPipe } from './pipes/userdetail.pipe';
import { SidebarConfiguration } from './sidebar/sidebar.configuration';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    FullAddressPipe,
    UserDetailPipe,
    AutoFocusDirective,
  ],
  imports: [NgbModule, NgbModalModule],
  exports: [
    WorkInProgressComponent,
    FullAddressPipe,
    UserDetailPipe,
    AutoFocusDirective,
  ],
  providers: [SidebarConfiguration],
})
export class ComponentsModule {}
