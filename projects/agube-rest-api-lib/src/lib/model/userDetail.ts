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
import { Phone } from './phone';

export interface UserDetail {
  readonly id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  main_phone: Phone;
}
