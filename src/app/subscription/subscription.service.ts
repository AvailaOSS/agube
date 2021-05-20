import { Injectable } from '@angular/core';

export class SubscriptionServiceConfig {
  loginUrl: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private loginUrl: string;

  constructor(config: SubscriptionServiceConfig) {
    this.loginUrl = config.loginUrl;
  }

  public getLoginUrl(): string {
    return this.loginUrl;
  }
}
