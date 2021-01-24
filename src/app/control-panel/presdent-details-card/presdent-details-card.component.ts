import { Component, OnInit } from '@angular/core';

export interface PresidentDetails {
  name: string;
  phone: string;
  address: string;
  email: string;
}

@Component({
  selector: 'app-presdent-details-card',
  templateUrl: './presdent-details-card.component.html',
  styleUrls: ['./presdent-details-card.component.scss'],
})
export class PresdentDetailsCardComponent implements OnInit {
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
