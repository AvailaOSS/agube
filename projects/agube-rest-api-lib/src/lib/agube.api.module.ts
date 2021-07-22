import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { AgubeRestConfiguration } from './configuration.service';
import { AddressService } from './service/address.service';
import { DwellingService } from './service/dwelling.service';
import { ManagerService } from './service/manager.service';
import { PhoneService } from './service/phone.service';
import { ReservoirService } from './service/reservoir.service';
import { WaterMeterService } from './service/waterMeter.service';
import { UserService } from './service/user.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AddressService,
    DwellingService,
    ManagerService,
    PhoneService,
    UserService,
    ReservoirService,
    WaterMeterService,
  ],
})
export class AgubeApiModule {
  constructor(@Optional() @SkipSelf() parentModule?: AgubeApiModule) {
    if (parentModule) {
      throw new Error(
        'AgubeApiModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(
    config: AgubeRestConfiguration
  ): ModuleWithProviders<AgubeApiModule> {
    return {
      ngModule: AgubeApiModule,
      providers: [{ provide: AgubeRestConfiguration, useValue: config }],
    };
  }
}
