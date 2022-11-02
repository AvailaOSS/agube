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
import { Manager } from '../model/manager';
import { ManagerConfiguration } from '../model/managerConfiguration';
import { ManagerMessage } from '../model/managerMessage';
import { UserIsManager } from '../model/userIsManager';

@Injectable()
export class ManagerService {
  protected basePath = '';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(
    protected httpClient: HttpClient,
    private svcConfig: AgubeRestConfigurationService,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
      this.basePath = configuration.basePath || this.basePath;
    }
    this.basePath = this.svcConfig.getBasePath();
  }

  /**
   *
   * Get Manager
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getManagerByUser(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<Manager>;
  public getManagerByUser(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<Manager>>;
  public getManagerByUser(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<Manager>>;
  public getManagerByUser(
    observe: any = 'body',
    reportProgress: boolean = false
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

    return this.httpClient.get<Manager>(`${this.basePath}/manager/by-user`, {
      headers: headers,
      observe: observe,
      reportProgress: reportProgress,
      withCredentials: this.configuration.withCredentials,
    });
  }

  /**
   *
   * Get Manager Configuration
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getManagerConfiguration(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ManagerConfiguration>;
  public getManagerConfiguration(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ManagerConfiguration>>;
  public getManagerConfiguration(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ManagerConfiguration>>;
  public getManagerConfiguration(
    observe: any = 'body',
    reportProgress: boolean = false
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
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];

    return this.httpClient.get<ManagerConfiguration>(
      `${this.basePath}/manager/configuration`,
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
   * Update manager configuration
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateManagerConfiguration(
    data: ManagerConfiguration,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ManagerConfiguration>;
  public updateManagerConfiguration(
    data: ManagerConfiguration,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ManagerConfiguration>>;
  public updateManagerConfiguration(
    data: ManagerConfiguration,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ManagerConfiguration>>;
  public updateManagerConfiguration(
    data: ManagerConfiguration,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling updateManagerConfiguration.'
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
    let httpHeaderAccepts: string[] = ['application/json'];
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

    return this.httpClient.post<ManagerConfiguration>(
      `${this.basePath}/manager/configuration/update`,
      data,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * true if user is manager
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public userIsManager(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<UserIsManager>;
  public userIsManager(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<UserIsManager>>;
  public userIsManager(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<UserIsManager>>;
  public userIsManager(
    observe: any = 'body',
    reportProgress: boolean = false
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
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];

    return this.httpClient.get<UserIsManager>(
      `${this.basePath}/manager/is-manager`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Get manager message
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public getManagerMessage(
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ManagerMessage>;
  public getManagerMessage(
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ManagerMessage>>;
  public getManagerMessage(
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ManagerMessage>>;
  public getManagerMessage(
    observe: any = 'body',
    reportProgress: boolean = false
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
    let httpHeaderAccepts: string[] = ['application/json'];
    const httpHeaderAcceptSelected: string | undefined =
      this.configuration.selectHeaderAccept(httpHeaderAccepts);
    if (httpHeaderAcceptSelected != undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['application/json'];

    return this.httpClient.get<ManagerMessage>(
      `${this.basePath}/manager/message`,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }

  /**
   *
   * Update manager message
   * @param data
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public updateManagerMessage(
    data: ManagerMessage,
    observe?: 'body',
    reportProgress?: boolean
  ): Observable<ManagerMessage>;
  public updateManagerMessage(
    data: ManagerMessage,
    observe?: 'response',
    reportProgress?: boolean
  ): Observable<HttpResponse<ManagerMessage>>;
  public updateManagerMessage(
    data: ManagerMessage,
    observe?: 'events',
    reportProgress?: boolean
  ): Observable<HttpEvent<ManagerMessage>>;
  public updateManagerMessage(
    data: ManagerMessage,
    observe: any = 'body',
    reportProgress: boolean = false
  ): Observable<any> {
    if (data === null || data === undefined) {
      throw new Error(
        'Required parameter data was null or undefined when calling updateManagerMessage.'
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
    let httpHeaderAccepts: string[] = ['application/json'];
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

    return this.httpClient.put<ManagerMessage>(
      `${this.basePath}/manager/message`,
      data,
      {
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress,
      }
    );
  }
}
