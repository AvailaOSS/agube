import { Component, OnInit, ViewChild } from '@angular/core';
import { Resident, ResidentService } from '@availa/agube-rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonTable } from '../../table';

@Component({
    selector: 'app-table-resident',
    templateUrl: '../../table.html',
    styleUrls: ['../../table.scss'],
})
export class TableResidentComponent extends PersonTable implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.loadPersons();
    }

    constructor(
        protected svcResident: ResidentService,
        protected override router: Router,
        protected override route: ActivatedRoute
    ) {
        super(router, route);
    }

    public override goTo(resident: Resident) {
        this.router.navigate(['/manager/home/person/residents/detail', resident.id]);
    }

    public override loadPersons() {
        this.svcResident.getResidents().subscribe((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }
}
