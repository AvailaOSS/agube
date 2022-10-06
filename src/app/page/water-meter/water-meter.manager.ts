import { Injectable } from '@angular/core';
import { DwellingService, ReservoirService, WaterMeter, WaterMeterWithMeasurements } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';
import { DateFilter, formatDate } from 'src/app/utils/date/date-filter';
import { WaterMeterType } from './water-meter-type.enum';

@Injectable({
    providedIn: 'root',
})
export class WaterMeterManager {
    constructor(private readonly svcDwelling: DwellingService, private readonly svcReservoir: ReservoirService) {
        //
    }

    public change(id: number, waterMeter: WaterMeter, type: WaterMeterType): Observable<WaterMeter> {
        switch (type) {
            case WaterMeterType.DWELLING:
                return this.svcDwelling.changeCurrentDwellingWaterMeter(id, waterMeter);
            case WaterMeterType.RESERVOIR:
                return this.svcReservoir.changeCurrentReservoirWaterMeter(id, waterMeter);
            case WaterMeterType.WATERSOURCE:
                    return this.svcReservoir.changeCurrentReservoirWaterMeter(id, waterMeter);
                    // return this.svcWaterSource.changeCurrentWaterSourceWaterMeter(id, waterMeter);
            default:
                throw new Error('type in ' + type + ' is not valid...');
        }
    }

    public get(id: number, type: WaterMeterType): Observable<WaterMeter> {
        switch (type) {
            case WaterMeterType.DWELLING:
                return this.svcDwelling.getCurrentDwellingWaterMeter(id);
            case WaterMeterType.RESERVOIR:
                return this.svcReservoir.getCurrentReservoirWaterMeter(id);
            case WaterMeterType.WATERSOURCE:
                return this.svcReservoir.getCurrentReservoirWaterMeter(id);
                // return this.svcWaterSource.getCurrentWaterSourceWaterMeter(id);
            default:
                throw new Error('type in ' + type + ' is not valid...');
        }
    }

    public getPaginated(
        id: number,
        pageSize: number,
        date: DateFilter,
        type: WaterMeterType
    ): Observable<WaterMeterWithMeasurements> | any {
        switch (type) {
            case WaterMeterType.DWELLING:
                return this.svcDwelling.getDwellingWaterMeterMeasurements(
                    id,
                    undefined,
                    pageSize,
                    date.dateStart ? formatDate(date.dateStart) : undefined,
                    date.dateEnd ? formatDate(date.dateEnd) : undefined
                );
            case WaterMeterType.RESERVOIR:
                return this.svcReservoir.getReservoirWaterMeterMeasurements(
                    id,
                    undefined,
                    pageSize,
                    date.dateStart ? formatDate(date.dateStart) : undefined,
                    date.dateEnd ? formatDate(date.dateEnd) : undefined
                );
                case WaterMeterType.WATERSOURCE:
                    return this.svcReservoir.getReservoirWaterMeterMeasurements(
                        id,
                        undefined,
                        pageSize,
                        date.dateStart ? formatDate(date.dateStart) : undefined,
                        date.dateEnd ? formatDate(date.dateEnd) : undefined
                );
                // return this.svcWaterSource.getWaterSourceWaterMeterMeasurements(
                //     id,
                //     undefined,
                //     pageSize,
                //     date.dateStart ? formatDate(date.dateStart) : undefined,
                //     date.dateEnd ? formatDate(date.dateEnd) : undefined
                // );
            default:
                throw new Error('type in ' + type + ' is not valid...');
        }
    }
}
