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
import { ToolbarModule } from './menu/toolbar.module';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { ContactPanelModule } from './contact-panel/contact-panel.module';
import { DepositPanelModule } from './deposit-panel/deposit-panel.module';
import { AdDWellingModule } from './dwelling/dwelling-detail-card/management-components/add-welling/add-welling.module';
import { UtilsModule } from './dwelling/dwelling-detail-card/management-components/utils/utils.module';

@NgModule({
  declarations: [AppComponent, WorkInProgressComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
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
    DWellingModule,
    ContactPanelModule,
    AdDWellingModule,
    DepositPanelModule,
    UtilsModule,
    ComponentsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
