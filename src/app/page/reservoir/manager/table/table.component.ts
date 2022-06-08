import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservoirDetail } from '@availa/agube-rest-api';
import { Detail } from 'src/app/page/reservoir/detail/detail';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
    public displayedColumns: string[] = ['capacity', 'inlet_flow', 'outlet_flow', 'full_address'];
    dataSource: MatTableDataSource<ReservoirDetail> = new MatTableDataSource();
    public isSelected: ReservoirDetail | undefined = undefined;
    @Output() public selectedElement: EventEmitter<ReservoirDetail | undefined> = new EventEmitter<
        ReservoirDetail | undefined
    >();

    public filter = new FormControl('');

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private router: Router, private svcReservoir: ReservoirCacheService) {}

    ngOnInit(): void {
        //FIXME: set pagination into table
        this.loadReservoirs();
    }

    public goToNewReservoir() {
        this.router.navigate(['manager/reservoirs/create']);
    }

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }

    public goToReservoir(reservoir: ReservoirDetail) {
        const queryParams: Detail = {
            reservoirId: reservoir.id!,
        };
        this.router.navigate(['/manager/home/reservoirs/detail'], {
            queryParams,
        });
    }

    private loadReservoirs() {
        this.svcReservoir.get().then((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }
}
