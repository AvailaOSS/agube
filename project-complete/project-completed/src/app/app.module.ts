import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
  SubscriptionclientService,
  SubscriptionpaymentTypesService,
  SubscriptionService,
} from 'subscription-rest-api-lib';
import { ContactService, TagService } from 'contact-book-rest-api';
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
import { PrincipalModule } from './principal/principal.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SubscriptionModule,
    ContactBookModule,
    BrowserAnimationsModule,
    PrincipalModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    SubscriptionService,
    SubscriptionclientService,
    SubscriptionpaymentTypesService,
    ContactService,
    TagService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
