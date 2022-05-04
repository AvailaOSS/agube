import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@availa/agube-rest-api';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['../info.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() public geolocation: Geolocation | undefined;

  constructor() {}

  ngOnInit(): void {}
}
