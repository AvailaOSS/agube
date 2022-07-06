import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgubeApiModule } from '@availa/agube-rest-api';
import { AuthModule, AuthRoute } from '@availa/auth-fe';
import { SubscriptionModule, SubscriptionRoute } from '@availa/subscription-fe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarRoute } from './page/home/sidebar-route';
import { DwellingCacheService } from './utils/cache/dwelling-cache.service';
import { ReservoirCacheService } from './utils/cache/reservoir-cache.service';

export function HttpLoaderFactory(http: HttpClient) {
    return new MultiTranslateHttpLoader(http, [
        { prefix: '../assets/i18n/', suffix: '.json' },
        { prefix: './src/assets/auth/', suffix: '.json' },
        { prefix: './src/assets/contact-book/', suffix: '.json' },
    ]);
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SubscriptionModule.forRoot({
            loginUrl: AuthRoute.ENABLE_ACCOUNT,
            subscriptionRestconfig: {
                basePath: environment.subscriptionBackendUrl,
            },
        }),
        AuthModule.forRoot({
            authRestconfig: {
                basePath: environment.authBackendUrl,
            },
            afterLoginSuccessUrl: SidebarRoute.MANAGER,
            createAccountUrl: SubscriptionRoute.SUBSCRIPTION,
        }),
        AgubeApiModule.forRoot({
            basePath: environment.agubeBackendUrl,
        }),
        TranslateModule.forRoot({
            loader: [
                {
                    provide: TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [HttpClient],
                },
            ],
            isolate: true,
        }),
        NgxGoogleAnalyticsModule.forRoot(environment.googleAnalyticsId),
        NgxGoogleAnalyticsRouterModule,
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
    ],
    providers: [DwellingCacheService, ReservoirCacheService],
    bootstrap: [AppComponent],
})
export class AppModule {}
