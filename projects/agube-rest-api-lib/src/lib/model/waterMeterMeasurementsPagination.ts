import { CustomPagination } from './customPagination';
import { WaterMeterMeasurement } from "./waterMeterMeasurement";

export interface WaterMeterMeasurementsPagination extends CustomPagination {
  results: Array<WaterMeterMeasurement>;
}
