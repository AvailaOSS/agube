import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { BrowserModule } from '@angular/platform-browser';
import { PricingModule } from './pricing/pricing.module';
import { GenericFormsModule } from './generic-forms/generic-forms.module';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [CommonModule, BrowserModule, PricingModule, GenericFormsModule],
})
export class SubscriptionModule {}
