import { TableReloadService } from '../../../residents/manager/table/table-reload.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService, ResidentService } from '@availa/agube-rest-api';
import { TableComponent } from '../../../residents/manager/table/table.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableOwnerComponent extends TableComponent implements OnInit, AfterViewInit {
    constructor(
        protected override router: Router,
        protected override svcResident: ResidentService,
        private svcOwner: OwnerService,
        protected override svcTableReload: TableReloadService,
        protected override route: ActivatedRoute
    ) {
        super(router, svcResident, svcTableReload, route);
    }

    override ngOnInit(): void {
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadOwners();
            }
        });
    }
    override ngAfterViewInit() {
        this.loadOwners();
    }
    private loadOwners() {
        this.svcOwner.getOwners().subscribe((response) => {
            console.log(response);
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }
}
