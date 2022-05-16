import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Resident, ResidentDetail, ResidentService } from '@availa/agube-rest-api';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TableReloadService } from './table-reload.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
    public displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'geolocation'];

    public dataSource: MatTableDataSource<ResidentDetail> = new MatTableDataSource();

    public isSelected: Resident | undefined = undefined;

    public filter = new FormControl('');

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private router: Router,
        private svcResident: ResidentService,
        private svcTableReload: TableReloadService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadResidents();
            }
        });
    }

    ngAfterViewInit() {
        this.loadResidents();
    }

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }

    public goToResident(resident: Resident) {
        const queryParams: Params = {
            data: resident,
        };

        this.router.navigate(['/manager/home/residents/detail'], {
            queryParams: {
                resident: JSON.stringify(queryParams),
            },
        });
    }

    private loadResidents() {
        this.svcResident.getResidents().subscribe((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }
}
