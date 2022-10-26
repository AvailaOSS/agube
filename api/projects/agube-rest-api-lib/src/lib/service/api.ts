export * from './auth.service';
import { AuthService } from './auth.service';
export * from './token.service';
import { TokenService } from './token.service';
export * from './address.service';
import { AddressService } from './address.service';
export * from './dwelling.service';
import { DwellingService } from './dwelling.service';
export * from './manager.service';
import { ManagerService } from './manager.service';
export * from './phone.service';
import { PhoneService } from './phone.service';
export * from './reservoir.service';
import { ReservoirService } from './reservoir.service';
export * from './user.service';
import { UserService } from './user.service';
export * from './waterMeter.service';
import { WaterMeterService } from './waterMeter.service';
export * from './measurement.service';
import { MeasurementService } from './measurement.service';
export * from './resident.service';
import { ResidentService } from './resident.service';
export * from './owner.service';
import { OwnerService } from './owner.service';
export * from './geolocation.service';
import { GeolocationService } from './geolocation.service';
export * from './comments.service';
import { CommentsService } from './comments.service';
export * from './springsource.service';
import { SpringSourceService } from './springsource.service';
export const APIS = [
  AuthService,
  TokenService,
  AddressService,
  DwellingService,
  ManagerService,
  PhoneService,
  ReservoirService,
  UserService,
  WaterMeterService,
  MeasurementService,
  ResidentService,
  OwnerService,
  GeolocationService,
  CommentsService,
  SpringSourceService,
];
