import { Component, OnInit } from '@angular/core';
import { SpringSourceResume, SpringSourceService } from '@availa/agube-rest-api';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    public waterSourceResume: SpringSourceResume | undefined;

    constructor(private svcWaterSource: SpringSourceService) {}
    ngOnInit(): void {
        this.svcWaterSource.getSpringSourceResume().subscribe((response) => (this.waterSourceResume = response));
    }
}
