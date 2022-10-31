import { Component, Input, OnInit } from '@angular/core';
import { Geolocation } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-address',
    styleUrls: ['./address.component.scss'],
    templateUrl: './address.component.html',
})
export class AddressComponent implements OnInit {
    @Input() public geolocation: Geolocation | undefined;

    constructor() {}

    ngOnInit(): void {}
}
