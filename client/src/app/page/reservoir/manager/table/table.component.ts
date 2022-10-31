import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservoirDetail } from '@availaoss/agube-rest-api';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';
import { Detail } from 'src/app/page/reservoir/detail/detail';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { goToReservoir } from 'src/app/utils/redirections/redirector';
import { TableReloadService } from './table-reload.service';

@Component({
    selector: 'app-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit {
    //fields to table
    public displayedColumns: string[] = ['capacity', 'inlet_flow', 'outlet_flow', 'full_address'];

    //table data sources
    public dataSource: MatTableDataSource<ReservoirDetail> = new MatTableDataSource();
    public isSelected: ReservoirDetail | undefined = undefined;

    // filter
    public filter = new FormControl('');

    // pagination
    public pageSide: number = 12;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private router: Router,
        private svcTableReload: TableReloadService,
        private svcReservoir: ReservoirCacheService,
        private readonly joyrideService: JoyrideService,
        private readonly svcTranslate: TranslateService
    ) {}

    public ngAfterViewInit() {
        this.loadReservoirs();
    }

    public ngOnInit(): void {
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadReservoirs();
            }
        });
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
        goToReservoir(this.router, queryParams);
    }

    // Function to launch joyride to start tour in Reservoirs
    public tour() {
        // Send step to joyride
        let steps: string[] = ['ReservoirCreateStep', 'ReservoirFilterStep', 'ReservoirMapStep'];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    private loadReservoirs() {
        this.svcReservoir.get().then((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
            this.dataSource.filterPredicate = (data: ReservoirDetail, filter: string): boolean => {
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
        });
    }
}
