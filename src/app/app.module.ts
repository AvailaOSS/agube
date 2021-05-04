import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactBookApiModule } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { SubscriptionApiModule } from 'apiaux/subscription-rest-api-lib/src/public-api';
import { TaskApiModule } from 'apiaux/task-rest-api-lib/src/public-api';
import { AgubeModule } from './agube/agube.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { ContactBookModule } from './contact-book/contact-book.module';
import { SubscriptionModule } from './subscription/subscription.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    SubscriptionModule,
    ContactBookModule,
    AgubeModule,
    BrowserModule,
    AppRoutingModule,
    SubscriptionApiModule,
    ContactBookApiModule,
    TaskApiModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
