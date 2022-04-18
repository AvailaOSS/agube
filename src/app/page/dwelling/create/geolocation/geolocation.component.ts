import { Component, OnInit } from '@angular/core';
import { EntityPersistantData } from './address-persistant-data';
import { AddressPersistantService } from './address-persistant.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements OnInit {
  public entity: EntityPersistantData | undefined;

  constructor(private addressPersistante: AddressPersistantService) {}

  ngOnInit(): void {
    this.addressPersistante
      .get()
      .subscribe((response) => (this.entity = response));
  }
}
