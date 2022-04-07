import { Type } from '@angular/core';

export interface ConfigurationComponentSelector {
  defaultComponent: Type<any>;
  mobile: Type<any>;
  tablet: Type<any>;
  desktop: Type<any>;
  tv: Type<any>;
}
