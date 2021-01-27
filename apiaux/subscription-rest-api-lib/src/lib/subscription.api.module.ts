import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { SubscriptionService } from './service/subscription.service';
import { ClientService } from './service/client.service';
import { PaymentTypesService } from './service/paymentTypes.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [SubscriptionService, ClientService, PaymentTypesService],
})
export class SubscriptionApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<SubscriptionApiModule> {
    return {
      ngModule: SubscriptionApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: SubscriptionApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'SubscriptionApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
