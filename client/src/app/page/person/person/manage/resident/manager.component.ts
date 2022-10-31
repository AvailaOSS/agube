import { Component } from '@angular/core';
import { ManageComponent } from '../manage';

@Component({
    selector: 'app-page-manage-resident',
    styleUrls: ['../manage.scss'],
    templateUrl: './manager.component.html',
})
export class ManagerResidentComponent extends ManageComponent {
    constructor() {
        super();
    }
}
