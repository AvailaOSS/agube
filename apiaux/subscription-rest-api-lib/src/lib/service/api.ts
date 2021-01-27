export * from './subscription.service';
import { SubscriptionService } from './subscription.service';
export * from './client.service';
import { ClientService } from './client.service';
export * from './paymentTypes.service';
import { PaymentTypesService } from './paymentTypes.service';
export const APIS = [SubscriptionService, ClientService, PaymentTypesService];
