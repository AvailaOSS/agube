import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { AgubeRestConfiguration } from './configuration.service';
import { AddressService } from './service/address.service';
import { DwellingService } from './service/dwelling.service';
import { ManagerService } from './service/manager.service';
import { OwnerService } from './service/owner.service';
import { PhoneService } from './service/phone.service';
import { ReservoirService } from './service/reservoir.service';
import { ResidentService } from './service/resident.service';
import { UserService } from './service/user.service';
import { WaterMeterService } from './service/waterMeter.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AddressService,
    DwellingService,
    ManagerService,
    PhoneService,
    UserService,
    ReservoirService,
    WaterMeterService,
    ResidentService,
    OwnerService,
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
