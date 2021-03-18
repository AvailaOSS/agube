import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/client.service';
import { Subscription } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/model/subscription';
import { SubscriptionService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/subscription.service';

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
  public president: PresidentDetails = {address:'',email:'',name:'',phone:''};

  constructor(private readonly svcClientService: ClientService) {


  }

  ngOnInit(): void {

  }
}
