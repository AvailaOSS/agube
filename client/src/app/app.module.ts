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
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        AuthModule.forRoot({
            authRestconfig: {
                basePath: environment.agubeBackendUrl,
            },
            afterLoginSuccessUrl: SidebarRoute.MANAGER,
            createAccountUrl: '',
        }),
        AgubeApiModule.forRoot({
            basePath: environment.agubeBackendUrl,
        }),
        TranslateModule.forRoot({
            isolate: true,
            loader: [
                {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            ],
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsId),
        NgxGoogleAnalyticsRouterModule,
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        JoyrideModule.forRoot(),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule {}
