
import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './service/token.service';
import { UserService } from './service/user.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [TokenService, UserService],
})
export class AuthApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<AuthApiModule> {
    return {
      ngModule: AuthApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: AuthApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        'AuthApiModule is already loaded. Import in your base AppModule only.'
      );
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
