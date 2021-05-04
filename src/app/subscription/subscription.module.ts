import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { BrowserModule } from '@angular/platform-browser';
import { CreateAccountFormModule } from './create-account-form/create-account-form.module';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [CommonModule, BrowserModule, CreateAccountFormModule],
})
export class SubscriptionModule {}
