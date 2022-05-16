import { Component, ViewChild, OnInit } from '@angular/core';
import { Owner, OwnerService } from '@availa/agube-rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonTable } from '../../table';
import { IDetail } from '../../detail';

@Component({
    selector: 'app-table-owner',
    templateUrl: '../../table.html',
    styleUrls: ['../../table.scss'],
})
export class TableOwnerComponent extends PersonTable implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    ngOnInit(): void {
        this.title = 'PAGE.OWNERS.MANAGER.TABLE.TITLE';
        this.loadPersons();
    }

    constructor(
        protected svcOwner: OwnerService,
        protected override router: Router,
        protected override route: ActivatedRoute
    ) {
        super(router, route);
    }

    public override goTo(owner: Owner) {
        const queryParams: IDetail = {
            personId: owner.id!,
        };

        this.router.navigate(['/manager/home/owners/detail'], {
            queryParams,
        });
    }

    public override loadPersons() {
        this.svcOwner.getOwners().subscribe((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }
}
