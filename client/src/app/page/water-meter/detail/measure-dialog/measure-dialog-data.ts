import { WaterMeterMeasurement } from '@availaoss/agube-rest-api';
export interface MeasureDialogData {
    waterMeterId: number;
    lastMeasurement: WaterMeterMeasurement | undefined;
}
