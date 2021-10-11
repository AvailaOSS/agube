import { Injectable } from '@angular/core';
import {
  DwellingService,
  ReservoirService,
  WaterMeter,
} from '@availa/agube-rest-api';
import { WaterMeterType } from './water-meter-type.enum';

@Injectable({
  providedIn: 'root',
})
export class WaterMeterManager {
  constructor(
    private readonly svcDwelling: DwellingService,
    private readonly svcReservoir: ReservoirService
  ) {
    //
  }

  public change(id: number, waterMeter: WaterMeter, type: WaterMeterType) {
    if (type == WaterMeterType.DWELLING) {
      return this.svcDwelling.changeCurrentDwellingWaterMeter(id, waterMeter);
    } else if (type == WaterMeterType.RESERVOIR) {
      return this.svcReservoir.changeCurrentReservoirWaterMeter(id, waterMeter);
    } else {
      return undefined;
    }
  }

  public get(id: number, type: WaterMeterType) {
    if (type == WaterMeterType.DWELLING) {
      return this.svcDwelling.getCurrentDwellingWaterMeter(id);
    } else if (type == WaterMeterType.RESERVOIR) {
      return this.svcReservoir.getCurrentReservoirWaterMeter(id);
    } else {
      return undefined;
    }
  }

  public getChunk(id: number, chunk: number, type: WaterMeterType) {
    if (type == WaterMeterType.DWELLING) {
      return this.svcDwelling.getCurrentWaterMeterMeasuresChunk(
        String(chunk),
        String(id)
      );
    } else if (type == WaterMeterType.RESERVOIR) {
      return this.svcReservoir.getReservoirCurrentWaterMeterMeasuresChunk(
        String(chunk),
        String(id)
      );
    } else {
      return undefined;
    }
  }
}
