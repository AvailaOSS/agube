import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SubscriptionApiModule } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { CreateAccountFormModule } from './create-account-form/create-account-form.module';
import { SubscriptionComponent } from './subscription.component';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SubscriptionApiModule,
    CreateAccountFormModule,
  ],
})
export class SubscriptionModule {}
