import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@availa/auth-fe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { FullAddressPipe } from './pipes/fulladdress.pipe';
import { UserDetailPipe } from './pipes/userdetail.pipe';
import { SidebarConfiguration } from './sidebar/sidebar.configuration';
import { AutoFocusDirective } from './directives/auto-focus.directive';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    FullAddressPipe,
    UserDetailPipe,
    AutoFocusDirective,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    AuthModule,
  ],
  exports: [
    WorkInProgressComponent,
    FullAddressPipe,
    UserDetailPipe,
    AutoFocusDirective,
  ],
  providers: [SidebarConfiguration],
})
export class ComponentsModule { }
