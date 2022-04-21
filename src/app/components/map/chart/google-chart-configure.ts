import { WaterMeter, WaterMeterMeasurement, WaterMeterWithMeasurements, ManagerConfiguration } from '@availa/agube-rest-api';
export interface GoogleChartConfigure {
  id: string;
  options: Options;
  water_meter: WaterMeter;
  water_meter_measurement?: WaterMeterWithMeasurements;
  consumeToday: ManagerConfiguration
}

export interface Options {
  width: number;
  height: number;
  redFrom: number;
  redTo: number;
  yellowFrom: number;
  yellowTo: number;
  minorTicks: number;
}
