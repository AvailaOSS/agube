export * from './client.service';
import { ClientService } from './client.service';
export * from './paymentTypes.service';
import { PaymentTypesService } from './paymentTypes.service';
export * from './subscription.service';
import { SubscriptionService } from './subscription.service';
export const APIS = [ClientService, PaymentTypesService, SubscriptionService];
