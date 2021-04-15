import { ComponentsModule } from './components/components.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SubscriptionApiModule } from '../../apiaux/subscription-rest-api-lib/src/lib/subscription.api.module';
import { ContactBookApiModule } from '../../apiaux/contact-book-rest-api-lib/src/lib/contact.book.api.module';
import { AgubeApiModule } from '../../apiaux/agube-rest-api-lib/src/lib/agube.api.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactBookModule } from './contact-book/contact-book.module';
import { ErrorInterceptor, JwtInterceptor } from './login/helpers';
import { LoginModule } from './login/login.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { DWellingModule } from './dwelling/dwelling.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { ContactPanelModule } from './contact-panel/contact-panel.module';
import { DepositPanelModule } from './deposit-panel/deposit-panel.module';
import { AdDWellingModule } from './dwelling/dwelling-detail-card/management-components/add-welling/add-welling.module';
import { UtilsModule } from './dwelling/dwelling-detail-card/management-components/dWellingUtils/utils.module';
import { ChangePasswordModule } from './login/change-password/change-password.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReservoirUtilsComponent } from './deposit-panel/deposit-panel-utils/reservoir-utils/reservoir-utils/reservoir-utils.component';
import { ReservoirUtilsModule } from './deposit-panel/deposit-panel-utils/reservoir-utils/reservoir-utils/reservoir-utils.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AuthApiModule } from '../../apiaux/auth-rest-api-lib/src/lib/auth.api.module';

@NgModule({
  declarations: [AppComponent, WorkInProgressComponent, ConfigurationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ChangePasswordModule,
    ToolbarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SubscriptionModule,
    ContactBookModule,
    BrowserAnimationsModule,
    ControlPanelModule,
    SubscriptionApiModule,
    ContactBookApiModule,
    AgubeApiModule,
    AuthApiModule,
    DWellingModule,
    ContactPanelModule,
    AdDWellingModule,
    DepositPanelModule,
    UtilsModule,
    ReservoirUtilsModule,
    ComponentsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
