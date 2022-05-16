import { Component, ViewChild, OnInit } from '@angular/core';
import { Owner, OwnerService } from '@availa/agube-rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonTable } from '../../table';

@Component({
    selector: 'app-table-owner',
    templateUrl: '../../table.html',
    styleUrls: ['../../table.scss'],
})
export class TableOwnerComponent extends PersonTable implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        protected svcOwner: OwnerService,
        protected override router: Router,
        protected override route: ActivatedRoute
    ) {
        super(router, route);
    }

    ngOnInit(): void {
        this.title = 'PAGE.OWNERS.MANAGER.TABLE.TITLE';
        console.log('HELLO WORLD');
        this.loadPersons();
    }

    public override goTo(owner: Owner) {
        this.router.navigate(['/manager/home/person/owners/detail', owner.id]);
    }

    public override loadPersons() {
        this.svcOwner.getOwners().subscribe((response) => {
            console.log('getOwners', response);
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }
}
