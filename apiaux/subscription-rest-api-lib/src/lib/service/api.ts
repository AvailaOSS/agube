export * from './subscription.service';
import { SubscriptionService } from './subscription.service';
export * from './subscriptionclient.service';
import { SubscriptionclientService } from './subscriptionclient.service';
export * from './subscriptionpaymentTypes.service';
import { SubscriptionpaymentTypesService } from './subscriptionpaymentTypes.service';
export const APIS = [SubscriptionService, SubscriptionclientService, SubscriptionpaymentTypesService];
