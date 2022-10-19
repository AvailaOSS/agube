import { WaterMeterMeasurement } from '@availaoss/agube-rest-api';

export interface MeasurementOverflow extends WaterMeterMeasurement {
    isOverflow: boolean;
    overflow: string;
}
