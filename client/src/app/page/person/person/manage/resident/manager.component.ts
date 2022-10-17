import { Component } from '@angular/core';
import { ManageComponent } from '../manage';

@Component({
    selector: 'app-page-manage-resident',
    templateUrl: './manager.component.html',
    styleUrls: ['../manage.scss'],
})
export class ManagerResidentComponent extends ManageComponent {
    constructor() {
        super();
    }
}
