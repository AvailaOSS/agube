import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SubscriptionApiModule } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { CreateAccountFormModule } from './create-account-form/create-account-form.module';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionServiceConfig } from './subscription.service';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    BrowserModule,
    SubscriptionApiModule,
    CreateAccountFormModule,
    SubscriptionRoutingModule,
  ],
})
export class SubscriptionModule {
  constructor(@Optional() @SkipSelf() parentModule: SubscriptionModule) {
    if (parentModule) {
      throw new Error(
        'SubscriptionModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(
    config: SubscriptionServiceConfig
  ): ModuleWithProviders<SubscriptionModule> {
    return {
      ngModule: SubscriptionModule,
      providers: [{ provide: SubscriptionServiceConfig, useValue: config }],
    };
  }
}
