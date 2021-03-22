import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthService } from './service/auth.service';
import { RefreshService } from './service/refresh.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AuthService,
    RefreshService
  ]
})
export class AgubeApiModule {

    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<AgubeApiModule> {
        return {
            ngModule: AgubeApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: AgubeApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('AgubeApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
