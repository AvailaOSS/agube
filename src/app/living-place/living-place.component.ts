import { Component, OnInit } from '@angular/core';

export interface LivingPlace {
  id: string;
  address: string;
  water_meter: string;
  resident_name: string;
  phone: string;
}

@Component({
  selector: 'app-living-place',
  templateUrl: './living-place.component.html',
  styleUrls: ['./living-place.component.scss'],
})
export class LivingPlaceComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
