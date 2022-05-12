import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
// import { ResidentDetail, ResidentService } from '@availa/agube-rest-api';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { TableReloadService } from './table-reload.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
    public displayedColumns: string[] = ['water_meter_code', 'full_address', 'resident_first_name', 'resident_phone'];
    // public dataSource: MatTableDataSource<ResidentDetail> = new MatTableDataSource();

    // public isSelected: ResidentDetail | undefined = undefined;

    public filter = new FormControl('');

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private router: Router,
        // private svcResident: ResidentService,
        private svcTableReload: TableReloadService
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

    public goToNewResident() {
        this.router.navigate(['manager/residents/create']);
    }

    public applyFilter() {
        // this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public clearFilter() {
        this.filter.setValue('');
        // this.dataSource.filter = '';
    }

    // public goToResident(resident: residentDetail) {
    //     const queryParams: Detail = {
    //         residentId: resident.id!,
    //     };
    //     // this.router.navigate(['/manager/home/manager/client/residnets/detail'], {
    //     //     queryParams,
    //     // });
    // }

    private loadResidents() {
        // this.svcResident.getResidents().subscribe((response) => {
        //     this.dataSource = new MatTableDataSource(response);
        //     this.dataSource.paginator = this.paginator!;
        // });
    }
}
