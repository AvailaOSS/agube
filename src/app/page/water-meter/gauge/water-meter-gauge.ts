import { WaterMeter, WaterMeterWithMeasurements } from '@availa/agube-rest-api';

export interface WaterMeterGauge {
    waterMeter: WaterMeter;
    waterMeterWithMeasure: WaterMeterWithMeasurements;
}
