import { Component, ViewChild, OnInit } from '@angular/core';
import { Owner, OwnerService } from '@availaoss/agube-rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonTable } from '../../table';
import { GeolocationPipe } from 'src/app/pipes/geolocation.pipe';
import { ITableOwner } from './table-owner';

@Component({
    selector: 'app-table-owner',
    styleUrls: ['../../table.scss'],
    templateUrl: '../../table.html',
})
export class TableOwnerComponent extends PersonTable implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private geolocationPipe: GeolocationPipe,
        protected svcOwner: OwnerService,
        protected override router: Router,
        protected override route: ActivatedRoute,
    ) {
        super(router, route);
        this.title = 'PAGE.OWNERS.MANAGER.TABLE.TITLE';
    }

    ngOnInit(): void {
        this.loadPersons();
    }

    public override goTo(owner: Owner) {
        this.router.navigate(['/manager/home/person/owners/detail', owner.id]);
    }

    public override loadPersons() {
        this.svcOwner.getOwners().subscribe({
            next: (response) => {
                let list = response.map((p) => {
                    let obj: ITableOwner = p;
                    obj.address = this.geolocationPipe.transform(p.geolocation!, 'short');
                    return obj;
                });
                this.dataSource = new MatTableDataSource(list);
                this.dataSource.paginator = this.paginator!;
            },
        });
    }
}
