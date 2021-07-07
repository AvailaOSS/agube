import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@availa/auth-fe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { TaskModule } from '@availa/task-fe';
import { FullAddressPipe } from './pipes/fulladdress.pipe';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    FullAddressPipe,
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
    FullAddressPipe
  ],
  providers: [],
})
export class ComponentsModule { }
