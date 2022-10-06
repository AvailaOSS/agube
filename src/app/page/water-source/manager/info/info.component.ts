import { Component, OnInit } from '@angular/core';
import { ReservoirResume, ReservoirService } from '@availa/agube-rest-api';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    public waterSourceResume: ReservoirResume | undefined;

    constructor(private svcWaterSource: ReservoirService) {}
    ngOnInit(): void {
        this.svcWaterSource.getResume().subscribe((response) => (this.waterSourceResume = response));
    }
}
