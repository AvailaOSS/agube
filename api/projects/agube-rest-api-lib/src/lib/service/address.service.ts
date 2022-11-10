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
/* tslint:disable:no-unused-variable member-ordering */

import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { AgubeRestConfigurationService } from '../configuration.service';
import { Address } from '../model/address';

@Injectable()
export class AddressService {
  protected basePath: string = '';
  public defaultHeaders: HttpHeaders = new HttpHeaders();
  public configuration: Configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    private svcConfig: AgubeRestConfigurationService,
    @Optional() configuration: Configuration,
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
    this.basePath = this.svcConfig.getBasePath();
  }

  /**
   *
   * get list of address
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getAddress(
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<Array<Address>>;
  public getAddress(
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<Array<Address>>>;
  public getAddress(
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<Array<Address>>>;
  public getAddress(
    observe: any = 'body',
    reportProgress: boolean = false,
  ): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (Basic) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];

    return this.httpClient.get<Array<Address>>(`${this.basePath}/address`, {
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
      withCredentials: this.configuration.withCredentials,
    });
  }
}
