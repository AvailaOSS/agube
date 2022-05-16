import { Component } from '@angular/core';
import { ManageComponent } from '../manage';

@Component({
    selector: 'app-page-manage-owner',
    templateUrl: './manager.component.html',
    styleUrls: ['../manage.scss'],
})
export class ManagerOwnerComponent extends ManageComponent {
    constructor() {
        super();
    }
}
