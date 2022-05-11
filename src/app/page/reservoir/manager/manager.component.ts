import { Component, OnInit } from '@angular/core';
import { ReservoirDetail } from '@availa/agube-rest-api';

@Component({
    selector: 'app-manager-reservoir',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
    public element: ReservoirDetail | undefined;

    constructor() {}

    ngOnInit(): void {}

    public readSelected(element: ReservoirDetail | undefined) {
        if (!element) {
            return;
        }
        this.element = element;
    }
}
