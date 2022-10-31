import { Component } from '@angular/core';
import { ManageComponent } from '../manage';

@Component({
    selector: 'app-page-manage-owner',
    styleUrls: ['../manage.scss'],
    templateUrl: './manager.component.html',
})
export class ManagerOwnerComponent extends ManageComponent {
    constructor() {
        super();
    }
}
