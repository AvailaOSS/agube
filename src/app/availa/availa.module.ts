import { NgModule } from '@angular/core';
import { AgubeApiModule } from '@availa/agube-rest-api';
import { AuthModule, AuthRoute } from '@availa/auth-fe';
import { ContactBookModule } from '@availa/contact-book-fe';
import { SubscriptionModule, SubscriptionRoute } from '@availa/subscription-fe';
import { TaskModule } from '@availa/task-fe';
import { ToolbarModule } from '@availa/toolbar';
import { environment } from 'src/environments/environment';
import { AgubeRoute } from '../agube/agube-route';
import { AgubeModule } from '../agube/agube.module';
import { AvailaRoutingModule } from './availa-routing.module';

@NgModule({
  declarations: [],
  imports: [
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
      loginUrl: AuthRoute.LOGIN,
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
    AvailaRoutingModule,
  ],
  exports: [
    AgubeModule,
    AgubeApiModule,
    ToolbarModule,
    AuthModule,
    SubscriptionModule,
    ContactBookModule,
    TaskModule,
  ],
})
export class AvailaModule {}
