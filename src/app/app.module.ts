import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgubeModule } from './agube/agube.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@availa/auth-fe';
import { ComponentsModule } from './components/components.module';
import { ContactBookModule } from './contact-book/contact-book.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthModule,
    SubscriptionModule,
    ContactBookModule,
    AgubeModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
    TaskModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
