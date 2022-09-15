import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-configuration-email',
    templateUrl: './configuration-email.component.html',
    styleUrls: ['./configuration-email.component.scss', '../manager-page.component.scss'],
})
export class ConfigurationEmailComponent implements OnInit {
    public loadSave: boolean = false;
    public message = new FormControl('', []);

    constructor() {}

    ngOnInit(): void {}

    saveNotification() {
        this.loadSave = true;
    }
}
