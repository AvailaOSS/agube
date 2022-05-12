import { DwellingResume, DwellingService } from '@availa/agube-rest-api';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    public dwellingResume: DwellingResume | undefined;

    constructor(private svcDwelling: DwellingService) {}

    ngOnInit(): void {
        this.svcDwelling.getResume().subscribe((response) => (this.dwellingResume = response));
    }
}
