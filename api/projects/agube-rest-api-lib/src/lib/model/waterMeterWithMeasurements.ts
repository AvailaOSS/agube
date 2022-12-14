/**
 * Agube API
 * Agube API REST definition
 *
 * OpenAPI spec version: v1
 * Contact: frannabril@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { WaterMeterMeasurement } from './waterMeterMeasurement';

export interface WaterMeterWithMeasurements {
  readonly id?: number;
  readonly code?: string;
  readonly release_date?: string;
  readonly discharge_date?: string;
  measures: Array<WaterMeterMeasurement>;
}
