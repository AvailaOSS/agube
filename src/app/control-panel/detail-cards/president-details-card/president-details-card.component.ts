import { Component, OnInit } from '@angular/core';
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
  public president: PresidentDetails = {address:'',email:'',name:'',phone:''};

  constructor(private readonly svcClientService: ClientService) {

    this.svcClientService.clientList().subscribe((client) => {
      this.president = {
        name:
          client[0].client.user.first_name +
          ' ' +
          client[0].client.user.last_name,
        phone: client[0].client.phone_number,
        address: client[0].client.business_name,
        email: client[0].client.user.email,
      };
    });
  }

  ngOnInit(): void {
    this.svcClientService.clientList().subscribe((client) => {
      this.president = {
        name:
          client[0].client.user.first_name +
          ' ' +
          client[0].client.user.last_name,
        phone: client[0].client.phone_number,
        address: client[0].client.business_name,
        email: client[0].client.user.email,
      };
    });
  }
}
