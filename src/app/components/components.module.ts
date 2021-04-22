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
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExampleComponent,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    ButtonSuccessDirective,
    ButtonDangerDirective,
    ButtonWarningDirective,
    ButtonInfoDirective,
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
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
    CalendarComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
