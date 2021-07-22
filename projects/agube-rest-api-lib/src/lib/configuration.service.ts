import { Injectable } from '@angular/core';

export class AgubeRestConfiguration {
  basePath: string = '';
}

@Injectable({
  providedIn: 'root',
})
export class AgubeRestConfigurationService {
  private basePath: string;

  constructor(config: AgubeRestConfiguration) {
    this.basePath = config.basePath;
  }

  public getBasePath(): string {
    return this.basePath;
  }
}
