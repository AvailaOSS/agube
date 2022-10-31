import { WaterMeter, WaterMeterWithMeasurements } from '@availaoss/agube-rest-api';

export interface WaterMeterGauge {
    waterMeter: WaterMeter;
    dwellingId?: number;
    reservoirId?: string;
    waterMeterWithMeasure: WaterMeterWithMeasurements;
}
