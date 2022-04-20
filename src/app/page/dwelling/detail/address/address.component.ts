import { Component, Input, OnInit } from '@angular/core';
import { Address } from '@availa/agube-rest-api';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  @Input() public address: Address | undefined;

  constructor() {}

  ngOnInit(): void {}
}
