import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@availa/auth-fe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExampleComponent } from './example/example.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    ExampleComponent,
    WorkInProgressComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    AuthModule,

  ],
  exports: [
    WorkInProgressComponent
  ],
  providers: [],
})
export class ComponentsModule {}
