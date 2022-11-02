import { JoyrideModule } from 'ngx-joyride';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgubeApiModule } from '@availaoss/agube-rest-api';
import { AuthModule } from './page/auth/auth.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarRoute } from './page/home/sidebar-route';
import { ErrorInterceptor } from './utils/error.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [{ prefix: '../assets/i18n/', suffix: '.json' }]);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        AgubeApiModule.forRoot({
            basePath: environment.agubeBackendUrl,
        }),
        AuthModule.forRoot({
            authRestconfig: {
                basePath: environment.agubeBackendUrl,
            },
            afterLoginSuccessUrl: SidebarRoute.MANAGER,
            createAccountUrl: '',
        }),
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        JoyrideModule.forRoot(),
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsId),
        NgxGoogleAnalyticsRouterModule,
        TranslateModule.forRoot({
            isolate: true,
            loader: [
                {
                    deps: [HttpClient],
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                },
            ],
        }),
    ],
    bootstrap: [AppComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
})
export class AppModule {}
