import { Component, OnInit } from '@angular/core';
import { ReservoirResume, ReservoirService } from '@availa/agube-rest-api';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    public reservoirResume: ReservoirResume | undefined;

    constructor(private svcReservoir: ReservoirService) {}
    ngOnInit(): void {
        this.svcReservoir.getResume().subscribe((response) => (this.reservoirResume = response));
    }
}
