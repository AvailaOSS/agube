/**
 * Auth API
 * Auth API REST definition
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
  HttpClient, HttpEvent, HttpHeaders, HttpResponse
} from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { AgubeRestConfigurationService } from '../configuration.service';
import { Configuration } from '../configuration';
import { JSONWebToken } from '../model/jSONWebToken';
import { RefreshJSONWebToken } from '../model/refreshJSONWebToken';

@Injectable()
export class TokenService {
  protected basePath: string = '';
  public defaultHeaders: HttpHeaders = new HttpHeaders();
  public configuration: Configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    private config: AgubeRestConfigurationService,
    @Optional() configuration: Configuration,
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
    this.basePath = this.config.getBasePath();
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  /**
   * API View that receives a POST with a user&#39;s username and password.
   * Returns a JSON Web Token that can be used for authenticated requests.
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public tokenAuthCreate(
    data: JSONWebToken,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<JSONWebToken>;
  public tokenAuthCreate(
    data: JSONWebToken,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<JSONWebToken>>;
  public tokenAuthCreate(
    data: JSONWebToken,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<JSONWebToken>>;
  public tokenAuthCreate(
    data: JSONWebToken,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling tokenAuthCreate.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (basic) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<JSONWebToken>(
      `${this.basePath}/token/auth`,
      data,
      {
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
        withCredentials: this.configuration.withCredentials,
      }
    );
  }

  /**
   * API View that returns a refreshed token (with new expiration) based on existing token
   * If &#39;orig_iat&#39; field (original issued-at-time) is found, will first check if it&#39;s within expiration window, then copy it to the new token
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public tokenRefreshCreate(
    data: RefreshJSONWebToken,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<RefreshJSONWebToken>;
  public tokenRefreshCreate(
    data: RefreshJSONWebToken,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<RefreshJSONWebToken>>;
  public tokenRefreshCreate(
    data: RefreshJSONWebToken,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<RefreshJSONWebToken>>;
  public tokenRefreshCreate(
    data: RefreshJSONWebToken,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling tokenRefreshCreate.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (basic) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
        btoa(this.configuration.username + ':' + this.configuration.password)
      );
    }

    // to determine the Accept header
    const httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected:
      | string
      | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];
    const httpContentTypeSelected:
      | string
      | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<RefreshJSONWebToken>(
      `${this.basePath}/token/refresh`,
      data,
      {
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
        withCredentials: this.configuration.withCredentials,
      }
    );
  }
}
