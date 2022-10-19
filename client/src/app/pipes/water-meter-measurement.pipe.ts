import { Pipe, PipeTransform } from '@angular/core';
import { WaterMeterMeasurement } from '@availaoss/agube-rest-api';

@Pipe({
    name: 'waterMeterMeasurement',
})
export class WaterMeterMeasurementPipe implements PipeTransform {
    transform(waterMeterMeasurement: WaterMeterMeasurement): string {
        return waterMeterMeasurement.measurement + ' ' + waterMeterMeasurement.date;
    }
}
