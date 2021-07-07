import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@availa/auth-fe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { TaskModule } from '@availa/task-fe';
import { FullAddressPipe } from './pipes/fulladdress.pipe';
import { UserDetailPipe } from './pipes/userdetail.pipe';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    FullAddressPipe,
    UserDetailPipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    AuthModule,
    TaskModule
  ],
  exports: [
    WorkInProgressComponent,
    FullAddressPipe,
    UserDetailPipe
  ],
  providers: [],
})
export class ComponentsModule { }
