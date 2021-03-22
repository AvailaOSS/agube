import { Component, OnInit } from '@angular/core';
import { User } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { AccountService } from 'src/app/login/service/account.service';
import { ClientService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/client.service';
import jwt_decode from 'jwt-decode';
import { SubscriptionService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/subscription.service';
import { Subscription } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/model/subscription';

export interface ClientDetails {
  name: string;
  nif: string;
  address: string;
  subscription_date: string;
  plan: string;
}

@Component({
  selector: 'app-client-details-card',
  templateUrl: './client-details-card.component.html',
  styleUrls: ['./client-details-card.component.scss'],
})
export class ClientDetailsCardComponent implements OnInit {
  public clientDetails: ClientDetails;
  public currentUser: User;
  public subs: Subscription[] = [];
  constructor(
    private readonly svcClientService: ClientService,
    private readonly svcAccountService: AccountService,
    private readonly svcSubscription: SubscriptionService
  ) {
    // TODO_: FIX ME MANAGER API!!!!!!!!!!
    this.svcAccountService.user.subscribe(
      (user) => {
        this.currentUser = jwt_decode(user.token);
        this.svcSubscription.subscriptionList().subscribe((subs) => {
          this.subs = subs;
        });
        this.svcClientService
          .getClient(this.currentUser.user_id)
          .subscribe((client) => {
            this.clientDetails.name = client['client'].business_name;
            this.clientDetails.address = client['client'].business_name;
            this.clientDetails.nif = client['client'].nif;
            this.clientDetails.plan = this.subs[client['subscription']].name;
            this.clientDetails.subscription_date = client[
              'expiration_date'
            ].split('T')[0];
          });
      },
      (error) => {
        this.svcAccountService.refresh();
      }
      // this.svcClientService.getClient()
    );
  }

  ngOnInit(): void {
    this.clientDetails = {
      name: 'Juego de Tronos',
      nif: '999999999999999A',
      address: 'Invernalia, 5, Piso 1',
      subscription_date: '',
      plan: 'Expert',
    };
  }
}
