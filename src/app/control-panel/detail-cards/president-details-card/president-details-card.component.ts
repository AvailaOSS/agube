import { Component, OnInit } from '@angular/core';

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
  public president: PresidentDetails;
  constructor() {}

  ngOnInit(): void {
    this.president = {
      name: 'John Snow',
      phone: '656456459',
      address: 'Invernalia, 5, Piso 1',
      email: 'johnsnow69@gmail.com',
    };
  }
}
