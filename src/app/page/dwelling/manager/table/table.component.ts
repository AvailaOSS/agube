import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DwellingDetail, DwellingService, ManagerConfiguration, ManagerService } from '@availa/agube-rest-api';
import { DwellingWaterMonthConsumption } from '@availa/agube-rest-api/lib/model/dwellingWaterMonthConsumption';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { Detail } from '../../detail/detail';
import { TableReloadService } from './table-reload.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
    //fields to table
    public displayedColumns: string[] = [
        'water_meter_code',
        'full_address',
        'resident_first_name',
        'resident_phone',
        'water_meter',
    ];
    //table data sources
    public dataSource: MatTableDataSource<DwellingDetail> = new MatTableDataSource();
    public isSelected: DwellingDetail | undefined = undefined;
    //filter
    public filter = new FormControl('');
    //pagination
    public pageSize = 12;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    public managerConfiguration: ManagerConfiguration | undefined;
    constructor(
        private router: Router,
        private svcDwelling: DwellingCacheService,
        private svcTableReload: TableReloadService,
        private svcManager: ManagerService,
        private svcDwellingService: DwellingService
    ) {
        this.svcManager.getManagerConfiguration().subscribe((res) => {
            this.managerConfiguration = res;
        });
    }

    ngOnInit(): void {
        //reload dwellings
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadDwellings();
            }
        });
    }

    ngAfterViewInit() {
        this.loadDwellings();
    }
    //go to create dwelling
    public goToNewDwelling() {
        this.router.navigate(['manager/dwellings/create']);
    }

    //apply filter in table
    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    //clear filter table
    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }
    //go to dwelling detail , click in table
    public goToDwelling(dwelling: DwellingDetail) {
        const queryParams: Detail = {
            dwellingId: dwelling.id!,
        };
        this.router.navigate(['/manager/home/manager/client/dwellings/detail'], {
            queryParams,
        });
    }
    //private method , load dwelling
    private loadDwellings() {
        this.svcDwelling.get().then((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
        });
    }

    //filter option data table to exceeded measurement dwelling
    public filterOptions(evt: MatSlideToggleChange) {
        if (evt.checked) {
            this.svcDwellingService.getDwellings(evt.checked).subscribe({
                next: (response) => {
                    this.dataSource = new MatTableDataSource(response);
                    this.dataSource.paginator = this.paginator!;
                },
            });
        } else {
            this.loadDwellings();
        }
    }
}
