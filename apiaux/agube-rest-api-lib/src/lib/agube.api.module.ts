import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'apiaux/auth-rest-api-lib/src/public-api';
import { AddressService } from './service/address.service';
import { DwellingService } from './service/dwelling.service';
import { ManagerService } from './service/manager.service';
import { PhoneService } from './service/phone.service';
import { ReservoirService } from './service/reservoir.service';
import { WaterMeterService } from './service/waterMeter.service';


@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AddressService,
    DwellingService,
    ManagerService,
    PhoneService,
    ReservoirService,
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
