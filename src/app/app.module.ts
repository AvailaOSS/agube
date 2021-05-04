import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgubeApiModule } from 'apiaux/agube-rest-api-lib/src/public-api';
import { ContactBookApiModule } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { SubscriptionApiModule } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { TaskApiModule } from 'apiaux/task-rest-api-lib/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ContactBookModule } from './contact-book/contact-book.module';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { DwellingUtilsModule } from './dwelling/dwelling-detail-card/management-detail-card/management-components/dwelling-utils/dwelling-utils.module';
import { DwellingModule } from './dwelling/dwelling.module';
import { EmailModule } from './email/email.module';
import { IncidentModule } from './incident/incident.module';
import { ReadingCountModule } from './reading-count/reading-count.module';
import { ReservoirUtilsModule } from './reservoir/reservoir-detail-card/management-detail-card/management-components/reservoir-utils/reservoir-utils.module';
import { ReservoirModule } from './reservoir/reservoir.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [AppComponent, WorkInProgressComponent, ConfigurationComponent],
  imports: [
    AuthModule,
    BrowserModule,
    AppRoutingModule,
    AgubeApiModule,
    SubscriptionApiModule,
    ContactBookApiModule,
    TaskApiModule,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SubscriptionModule,
    ContactBookModule,
    BrowserAnimationsModule,
    ControlPanelModule,
    DwellingModule,
    ReservoirModule,
    DwellingUtilsModule,
    ReservoirUtilsModule,
    ComponentsModule,
    ReadingCountModule,
    IncidentModule,
    EmailModule,
    ScheduleModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
