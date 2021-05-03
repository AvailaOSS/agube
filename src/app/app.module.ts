import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgubeApiModule } from 'apiaux/agube-rest-api-lib/src/public-api';
import { AuthApiModule } from 'apiaux/auth-rest-api-lib/src/public-api';
import { ContactBookApiModule } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { SubscriptionApiModule } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { TaskApiModule } from 'apiaux/task-rest-api-lib/src/public-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ContactBookModule } from './contact-book/contact-book.module';
import { ContactPanelModule } from './contact-panel/contact-panel.module';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { ReservoirUtilsModule } from './deposit-panel/deposit-panel-utils/reservoir-utils/reservoir-utils/reservoir-utils.module';
import { DepositPanelModule } from './deposit-panel/deposit-panel.module';
import { UtilsModule } from './dwelling/dwelling-detail-card/management-components/dwellingUtils/utils.module';
import { DwellingModule } from './dwelling/dwelling.module';
import { EmailModule } from './email/email.module';
import { IncidentModule } from './incident/incident.module';
import { EnableAccountModule } from './login/enable-account/enable-account.module';
import { ErrorInterceptor, JwtInterceptor } from './login/helpers';
import { LoginModule } from './login/login.module';
import { ReadingCountModule } from './reading-count/reading-count.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [AppComponent, WorkInProgressComponent, ConfigurationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgubeApiModule,
    AuthApiModule,
    SubscriptionApiModule,
    ContactBookApiModule,
    TaskApiModule,
    LoginModule,
    EnableAccountModule,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SubscriptionModule,
    ContactBookModule,
    BrowserAnimationsModule,
    ControlPanelModule,
    DwellingModule,
    ContactPanelModule,
    DepositPanelModule,
    UtilsModule,
    ReservoirUtilsModule,
    ComponentsModule,
    ReadingCountModule,
    IncidentModule,
    EmailModule,
    ScheduleModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
