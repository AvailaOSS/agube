import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgubeRoute } from './agube/agube-route';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvailaModule } from './availa/availa.module';
import { ComponentsModule } from './components/components.module';
import { SidebarConfiguration } from './components/sidebar/sidebar.configuration';
import { AgubeModule } from './agube/agube.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarModule } from '@availa/toolbar';
import { AuthModule, AuthRoute } from '@availa/auth-fe';
import { TaskModule, TaskRoute } from '@availa/task-fe';
import { SubscriptionModule, SubscriptionRoute } from '@availa/subscription-fe';
import { ContactBookModule } from '@availa/contact-book-fe';
import { environment } from 'src/environments/environment';
import { AgubeApiModule } from '@availa/agube-rest-api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SidebarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    AppRoutingModule,
    AgubeModule,
    AgubeApiModule.forRoot({ basePath: environment.agubeBackendUrl }),
    ToolbarModule.forRoot({ logOutPageUrl: AuthRoute.LOGIN }),
    AuthModule.forRoot({
      authRestconfig: {
        basePath: environment.authBackendUrl,
      },
      afterLoginSuccessUrl: AgubeRoute.DWELLING,
      createAccountUrl: SubscriptionRoute.SUBSCRIPTION,
    }),
    SubscriptionModule.forRoot({
      loginUrl: AuthRoute.ENABLE_ACCOUNT,
      subscriptionRestconfig: { basePath: environment.subscriptionBackendUrl },
    }),
    ContactBookModule.forRoot({
      contactBookRestconfig: {
        basePath: environment.contactBookBackendUrl,
      },
    }),
    TaskModule.forRoot({
      contactBookRestconfig: {
        basePath: environment.contactBookBackendUrl,
      },
      taskRestconfig: {
        basePath: environment.taskBackendUrl,
      },
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: SidebarConfiguration,
      useValue: {
        routes: [
          {
            path: AgubeRoute.DWELLING,
            name: 'Viviendas',
            icon: 'fas fa-home',
          },
          {
            path: AgubeRoute.RESERVOIR,
            name: 'Depósitos',
            icon: 'fas fa-hand-holding-water',
          },
          {
            path: TaskRoute.INCIDENCE,
            name: 'Incidencias',
            icon: 'fas fa-calendar-alt',
          },
          {
            path: AgubeRoute.CONFIG,
            name: 'Configuración',
            icon: 'fas fa-cog',
          },
        ],
      },
    },
  ],
  exports: [],
})
export class AppModule {}
