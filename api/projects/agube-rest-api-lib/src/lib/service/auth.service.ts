/**
 * Agube API
 * Agube API REST definition
 *
 * OpenAPI spec version: v1.0.0
 * Contact: frannabril@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangePassword } from '../model/changePassword';
import { EnableAccount } from '../model/enableAccount';
import { ResetPassword } from '../model/resetPassword';
import { Configuration } from '../configuration';
import { AgubeRestConfigurationService } from '../configuration.service';

@Injectable()
export class AuthService {
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
   * change password
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public changePassword(
    data: ChangePassword,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>;
  public changePassword(
    data: ChangePassword,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>;
  public changePassword(
    data: ChangePassword,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>;
  public changePassword(
    data: ChangePassword,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling changePassword.'
      );
    }

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
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.put<any>(
      `${this.basePath}/auth/change-password`,
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
   *
   * enable account of user if first time log in and save the new password
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public enableAccount(
    data: EnableAccount,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>;
  public enableAccount(
    data: EnableAccount,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>;
  public enableAccount(
    data: EnableAccount,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>;
  public enableAccount(
    data: EnableAccount,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling enableAccount.'
      );
    }

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
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.put<any>(
      `${this.basePath}/auth/enable-account`,
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
   *
   * reset password with
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public resetPassword(
    data: ResetPassword,
    observe?: 'body',
    reportProgress?: boolean,
  ): Observable<any>;
  public resetPassword(
    data: ResetPassword,
    observe?: 'response',
    reportProgress?: boolean,
  ): Observable<HttpResponse<any>>;
  public resetPassword(
    data: ResetPassword,
    observe?: 'events',
    reportProgress?: boolean,
  ): Observable<HttpEvent<any>>;
  public resetPassword(
    data: ResetPassword,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling resetPassword.'
      );
    }

    let headers = this.defaultHeaders;

    // authentication (Basic) required
    if (this.configuration.username || this.configuration.password) {
      headers = headers.set(
        'Authorization',
        'Basic ' +
          btoa(this.configuration.username + ':' + this.configuration.password),
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
    const httpContentTypeSelected: string | undefined =
      this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected != undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.put<any>(
      `${this.basePath}/auth/reset-password`,
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
