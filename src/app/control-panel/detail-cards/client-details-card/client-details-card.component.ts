import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../../apiaux/subscription-rest-api-lib/src/lib/service/client.service';

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
  constructor(private svcClientService: ClientService) {

  }

  ngOnInit(): void {
    this.svcClientService.clientList().subscribe(value=>{
      console.log(value)
    })
    this.clientDetails = {
      name: 'Juego de Tronos',
      nif: '999999999999999A',
      address: 'Invernalia, 5, Piso 1',
      subscription_date: 'Fecha Alta: 17 de abril de 2011',
      plan: 'Expert',
    };
  }
}
