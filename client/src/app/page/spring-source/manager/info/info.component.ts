import { Component, OnInit } from '@angular/core';
import { SpringSourceResume, SpringSourceService } from '@availaoss/agube-rest-api';

@Component({
    selector: 'app-info',
    styleUrls: ['./info.component.scss'],
    templateUrl: './info.component.html',
})
export class InfoComponent implements OnInit {
    public springSourceResume: SpringSourceResume | undefined;

    constructor(private svcSpringSource: SpringSourceService) {}

    public ngOnInit(): void {
        this.svcSpringSource.getSpringSourceResume().subscribe((response) => (this.springSourceResume = response));
    }
}
