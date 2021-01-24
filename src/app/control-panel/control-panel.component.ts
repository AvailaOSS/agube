import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public president: PresidentDetails;

  constructor(private readonly route: Router) {}

  public ngOnInit(): void {
    this.president = {
      name: 'John Snow',
      phone: '656456459',
      address: 'Invernalia, 5, Piso 1',
      email: 'johnsnow69@gmail.com',
    };
    this.users = JSON.parse(localStorage.getItem('users')) || [];
  }
}
