import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { AddressService } from './service/address.service';
import { DwellingService } from './service/dwelling.service';
import { PhoneService } from './service/phone.service';
import { TokenService } from './service/token.service';
import { UserService } from './service/user.service';
import { WaterMeterService } from './service/waterMeter.service';
import { RefreshService } from './service/refresh.service';



@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    RefreshService,
    AddressService,
    DwellingService,
    PhoneService,
    TokenService,
    UserService,
    WaterMeterService,
  ],
})
export class AgubeApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<AgubeApiModule> {
    return {
      ngModule: AgubeApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: AgubeApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'AgubeApiModule is already loaded. Import in your base AppModule only.'
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
