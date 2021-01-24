import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface ClientDetails {
  name: string;
  nif: string;
  address: string;
  subscription_date: string;
  plan: string;
}

export interface PresidentDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
}

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;
  public clientDetails: ClientDetails;
  public president: PresidentDetails;

  constructor(private readonly route: Router) {}

  public ngOnInit(): void {
    this.clientDetails = {
      name: 'Juego de Tronos',
      nif: '999999999999999A',
      address: 'Invernalia, 5, Piso 1',
      subscription_date: 'Fecha Alta: 17 de abril de 2011',
      plan: 'Expert',
    };
    this.president = {
      name: 'John Snow',
      phone: '656456459',
      address: 'Invernalia, 5, Piso 1',
      email: 'johnsnow69@gmail.com',
    };
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  }
}
