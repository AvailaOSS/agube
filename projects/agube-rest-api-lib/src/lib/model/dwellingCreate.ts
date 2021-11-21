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
import { FullAddress } from './fullAddress';
import { WaterMeter } from './waterMeter';


export interface DwellingCreate {
    readonly id?: number;
    full_address: FullAddress;
    water_meter: WaterMeter;
}
