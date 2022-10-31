import { Component, OnInit, ViewChild } from '@angular/core';
import { Resident, ResidentService } from '@availaoss/agube-rest-api';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PersonTable } from '../../table';
import { ITableResident } from './table-resident';
import { GeolocationPipe } from 'src/app/pipes/geolocation.pipe';

@Component({
    selector: 'app-table-resident',
    styleUrls: ['../../table.scss'],
    templateUrl: '../../table.html',
})
export class TableResidentComponent extends PersonTable implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private geolocationPipe: GeolocationPipe,
        protected svcResident: ResidentService,
        protected override router: Router,
        protected override route: ActivatedRoute,
    ) {
        super(router, route);
        this.title = 'PAGE.RESIDENTS.MANAGER.TABLE.TITLE';
    }

    ngOnInit(): void {
        this.loadPersons();
    }

    public override goTo(resident: Resident) {
        this.router.navigate(['/manager/home/person/residents/detail', resident.id]);
    }

    public override loadPersons() {
        this.svcResident.getResidents().subscribe({
            next: (response) => {
                let list = response.map((p) => {
                    let obj: ITableResident = p;
                    obj.address = this.geolocationPipe.transform(p.geolocation!, 'short');
                    return obj;
                });
                this.dataSource = new MatTableDataSource(list);
                this.dataSource.paginator = this.paginator!;
                this.dataSource.filterPredicate = (data: ITableResident, filter: string): boolean => {
                    const dataStr = Object.keys(data)
                        .reduce((currentTerm: string, key: string) => {
                            return currentTerm + (data as { [key: string]: any })[key] + '◬';
                        }, '')
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();

                    const transformedFilter = filter
                        .trim()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .toLowerCase();

                    return dataStr.indexOf(transformedFilter) != -1;
                };
            },
        });
    }
}
