import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Data } from './configuration';
import { NotificationService } from './notification.service';

@Component({
    selector: 'lib-notification',
    templateUrl: './notification.component.html',
})
export class NotificationComponent {
    message: String = '';

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Data) {
        this.message = data.message;
    }
}
