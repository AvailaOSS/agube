import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@availa/auth-fe';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonDangerDirective } from './buttons/button-danger/button-danger.directive';
import { ButtonInfoDirective } from './buttons/button-info/button-info.directive';
import { ButtonPrimaryDirective } from './buttons/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from './buttons/button-secondary/button-secondary.directive';
import { ButtonSuccessDirective } from './buttons/button-success/button-success.directive';
import { ButtonWarningDirective } from './buttons/button-warning/button-warning.directive';
import { ExampleComponent } from './example/example.component';
import { ToolbarModule } from './toolbar/toolbar.module';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    ExampleComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonWarningDirective,
    ButtonInfoDirective,
    WorkInProgressComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    AuthModule,
    ToolbarModule,
  ],
  exports: [
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonWarningDirective,
    ButtonInfoDirective,
    WorkInProgressComponent,
    ToolbarModule,
  ],
  providers: [],
})
export class ComponentsModule {}
