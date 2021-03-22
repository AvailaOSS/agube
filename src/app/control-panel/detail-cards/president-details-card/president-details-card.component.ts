import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/client.service';
import { Subscription } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/model/subscription';
import { SubscriptionService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/subscription.service';
import { AccountService } from 'src/app/login/service/account.service';
import { User } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import jwt_decode from 'jwt-decode';
import { Client } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/model/client';
import { SubscriptionClient } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/model/subscriptionClient';
import { UserDetail } from '../../../../../apiaux/agube-rest-api-lib/src/lib/model/userDetail';

export interface PresidentDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
}

@Component({
  selector: 'app-president-details-card',
  templateUrl: './president-details-card.component.html',
  styleUrls: ['./president-details-card.component.scss'],
})
export class PresidentDetailsCardComponent implements OnInit {
  public president: PresidentDetails = {
    address: '',
    email: '',
    name: '',
    phone: '',
  };
  public currentUser: User;

  constructor(
    private readonly svcClientService: ClientService,
    private readonly svcAccountService: AccountService
  ) {
    this.svcAccountService.user.subscribe(
      (user) => {
        this.currentUser = jwt_decode(user.token);
        console.log(this.currentUser)
        this.svcClientService.getClient(this.currentUser.user_id).subscribe(client => {
          console.log(client)
        })
      },
      (error) => {
        this.svcAccountService.refresh();
      }
      // this.svcClientService.getClient()
    );
  }

  ngOnInit(): void {}
}
