import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonDangerDirective } from './buttons/button-danger/button-danger.directive';
import { ButtonInfoDirective } from './buttons/button-info/button-info.directive';
import { ButtonPrimaryDirective } from './buttons/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from './buttons/button-secondary/button-secondary.directive';
import { ButtonSuccessDirective } from './buttons/button-success/button-success.directive';
import { ButtonWarningDirective } from './buttons/button-warning/button-warning.directive';
import { ExampleComponent } from './example/example.component';

@NgModule({
  declarations: [
    ExampleComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonWarningDirective,
    ButtonInfoDirective,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
  ],
  exports: [
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonWarningDirective,
    ButtonInfoDirective,
  ],
  providers: [],
})
export class ComponentsModule {}
