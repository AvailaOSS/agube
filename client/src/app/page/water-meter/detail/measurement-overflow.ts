import { WaterMeterMeasurement } from '@availa/agube-rest-api';

export interface MeasurementOverflow extends WaterMeterMeasurement {
    isOverflow: boolean;
    overflow: string;
}
