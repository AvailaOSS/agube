import { Component } from '@angular/core';
import { ReservoirDetail } from '@availa/agube-rest-api';

@Component({
    selector: 'app-manager-reservoir',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent {
    public element: ReservoirDetail | undefined;

    constructor() {}

    public readSelected(element: ReservoirDetail | undefined) {
        if (!element) {
            return;
        }
        this.element = element;
    }
}
