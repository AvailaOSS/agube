import { Component, OnInit } from '@angular/core';
import { ReservoirResume, ReservoirService } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-info',
    styleUrls: ['./info.component.scss'],
    templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
    public reservoirResume: ReservoirResume | undefined;

    constructor(private svcReservoir: ReservoirService) {}
    ngOnInit(): void {
        this.svcReservoir.getResume().subscribe((response) => (this.reservoirResume = response));
    }
}
