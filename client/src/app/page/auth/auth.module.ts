import { ResetPasswordModule } from './reset-password/reset-password.module';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthConfiguration } from './auth.configuration';
import { EnableAccountModule } from './enable-account/enable-account.module';
import { LoginModule } from './login/login.module';
import { AccountService } from './login/service/account.service';
import { AgubeApiModule, AgubeRestConfiguration } from '@availaoss/agube-rest-api';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [],
    exports: [],
    imports: [
        AuthRoutingModule,
        AgubeApiModule.forRoot({
            basePath: environment.agubeBackendUrl,
        }),
        LoginModule,
        EnableAccountModule,
        ResetPasswordModule,
        TranslateModule.forChild({
            isolate: true,
        }),
    ],
    providers: [AccountService, AuthConfiguration],
})
export class AuthModule {
    constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(config: AuthConfiguration): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                { provide: AuthConfiguration, useValue: config },
                { provide: AgubeRestConfiguration, useValue: config.authRestconfig },
            ],
        };
    }
}
