import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
    @Input() public geolocation: Geolocation | undefined;

    constructor() {}

    ngOnInit(): void {}
}
