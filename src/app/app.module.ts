import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SubscriptionApiModule } from '../../apiaux/subscription-rest-api-lib/src/lib/subscription.api.module';
import { ContactBookApiModule } from '../../apiaux/contact-book-rest-api-lib/src/lib/contact.book.api.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactBookModule } from './contact-book/contact-book.module';
import {
  ErrorInterceptor,
  fakeBackendProvider,
  JwtInterceptor,
} from './login/helpers';
import { LoginModule } from './login/login.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { LivingPlaceModule } from './living-place/living-place.module';
import { ToolbarModule } from './menu/toolbar.module';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

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
    LivingPlaceModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
