import { ButtonDangerDirective } from './buttons/button-danger/button-danger.directive';
import { ButtonInfoDirective } from './buttons/button-info/button-info.directive';
import { ButtonPrimaryDirective } from './buttons/button-primary/button-primary.directive';
import { ButtonSecondaryDirective } from './buttons/button-secondary/button-secondary.directive';
import { ButtonSuccessDirective } from './buttons/button-success/button-success.directive';
import { ButtonWarningDirective } from './buttons/button-warning/button-warning.directive';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example/example.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

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
  imports: [CommonModule, FlexLayoutModule],
  providers: [],
})
export class ComponentsModule {}
