import { WaterMeterType } from '../water-meter-type.enum';

export interface Type {
    id: number;
    type: WaterMeterType;
    canMeasurement:boolean
}
