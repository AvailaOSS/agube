import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { AgubeRestConfiguration } from './configuration.service';
import { AddressService } from './service/address.service';
import { DwellingService } from './service/dwelling.service';
import { GeolocationService } from './service/geolocation.service';
import { ManagerService } from './service/manager.service';
import { OwnerService } from './service/owner.service';
import { PhoneService } from './service/phone.service';
import { ReservoirService } from './service/reservoir.service';
import { ResidentService } from './service/resident.service';
import { UserService } from './service/user.service';
import { WaterMeterService } from './service/waterMeter.service';
import { MeasurementService } from './service/measurement.service';
import { CommentsService } from './service/comments.service';
import { SpringSourceService } from './service/springsource.service';
import { TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    AuthService,
    TokenService,
    AddressService,
    DwellingService,
    ManagerService,
    PhoneService,
    UserService,
    ReservoirService,
    WaterMeterService,
    MeasurementService,
    ResidentService,
    OwnerService,
    GeolocationService,
    CommentsService,
    SpringSourceService,
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
