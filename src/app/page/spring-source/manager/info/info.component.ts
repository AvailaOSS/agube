import { Component, OnInit } from '@angular/core';
import { SpringSourceResume, SpringSourceService } from '@availa/agube-rest-api';

@Component({
    selector: 'app-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
    public springSourceResume: SpringSourceResume | undefined;

    constructor(private svcSpringSource: SpringSourceService) { }

   public ngOnInit(): void {
        this.svcSpringSource.getSpringSourceResume().subscribe((response) => (this.springSourceResume = response));
    }
}
