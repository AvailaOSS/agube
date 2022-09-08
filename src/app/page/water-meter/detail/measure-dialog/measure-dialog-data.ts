import { WaterMeterMeasurement } from '@availa/agube-rest-api';
export interface MeasureDialogData {
    waterMeterId: number;
    lastMeasurement: WaterMeterMeasurement | undefined;
}
