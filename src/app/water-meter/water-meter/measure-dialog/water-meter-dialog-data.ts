import { WaterMeterMeasurement } from '@availa/agube-rest-api';

export interface WaterMeterDialogData {
  waterMeterId: number;
  lastMeasurement: WaterMeterMeasurement | undefined;
}
