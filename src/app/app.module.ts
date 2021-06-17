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

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    ToolbarModule.forRoot({ logOutPageUrl: 'login' }),
    AuthModule.forRoot({
      afterLoginSuccessUrl: AgubeRoute.DWELLING,
      createAccountUrl: SubscriptionRoute.SUBSCRIPTION,
    }),
    SubscriptionModule.forRoot({
      loginUrl: AuthRoute.LOGIN,
    }),
    AgubeModule,
    ContactBookModule,
    NgbModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
