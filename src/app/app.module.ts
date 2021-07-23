import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule, AuthRoute } from '@availa/auth-fe';
import { ToolbarModule } from '@availa/toolbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgubeRoute } from './agube/agube-route';
import { AgubeModule } from './agube/agube.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { SubscriptionRoute, SubscriptionModule } from '@availa/subscription-fe';
import { ContactBookModule } from '@availa/contact-book-fe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { environment } from 'src/environments/environment';
import { AgubeApiModule } from '@availa/agube-rest-api';

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AgubeApiModule.forRoot({ basePath: environment.agubeBackendUrl }),
    ToolbarModule.forRoot({ logOutPageUrl: 'login' }),
    AuthModule.forRoot({
      authRestconfig: {
        basePath: environment.authBackendUrl
      },
      afterLoginSuccessUrl: AgubeRoute.DWELLING,
      createAccountUrl: SubscriptionRoute.SUBSCRIPTION,
    }),
    SubscriptionModule.forRoot({
      loginUrl: AuthRoute.LOGIN,
    }),
    AgubeModule,
    ContactBookModule.forRoot({
      contactBookRestconfig: {
        basePath: environment.contactBookBackendUrl
      }
    }),
    NgbModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
