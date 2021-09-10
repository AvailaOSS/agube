import { Injectable } from "@angular/core";
import {
  DwellingService,
  ReservoirService,
  WaterMeter,
} from "@availa/agube-rest-api";
import { ChangeWaterMeterType } from "./change-water-meter-type.enum";

@Injectable({
  providedIn: "root",
})
export class ChangeWaterMeterService {
  constructor(
    private readonly svcDwelling: DwellingService,
    private readonly svcReservoir: ReservoirService
  ) {
    //
  }

  public change(
    id: number,
    waterMeter: WaterMeter,
    type: ChangeWaterMeterType
  ) {
    if (type == ChangeWaterMeterType.Dwelling) {
      return this.svcDwelling.changeCurrentDwellingWaterMeter(id, waterMeter);
    } else if (type == ChangeWaterMeterType.Reservoir) {
      return this.svcReservoir.changeCurrentReservoirWaterMeter(id, waterMeter);
    } else {
      return undefined;
    }
  }
}
