import { Component, OnInit } from '@angular/core';
import { ManagerService } from 'apiaux/agube-rest-api-lib/src/public-api';
import { User } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import jwt_decode from 'jwt-decode';
import { AccountService } from 'src/app/login/service/account.service';

import { ClientService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/client.service';

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
    private readonly svcManagerService: ManagerService,
    private readonly svcClientService: ClientService,
    private readonly svcAccountService: AccountService
  ) {

      // this.svcClientService.getClient()

  }

  public ngOnInit(): void {}
}
