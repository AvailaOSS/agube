import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DwellingDetail, DwellingService } from '@availaoss/agube-rest-api';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { goToDwelling } from 'src/app/utils/redirections/redirector';
import { Detail } from '../../detail/detail';
import { TableReloadService } from './table-reload.service';

@Component({
    selector: 'app-table',
    styleUrls: ['./table.component.scss'],
    templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, AfterViewInit {
    // fields to table
    public displayedColumns: string[] = [
        'water_meter_code',
        'full_address',
        'resident_first_name',
        'resident_phone',
        'water_meter',
    ];

    // table data sources
    public dataSource: MatTableDataSource<DwellingDetail> = new MatTableDataSource();
    public isSelected: DwellingDetail | undefined = undefined;

    // filter
    public filter = new FormControl('');

    // pagination
    public pageSize = 12;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    public managerConfigurationNumber: number | undefined;

    constructor(
        private router: Router,
        private svcDwelling: DwellingCacheService,
        private svcTableReload: TableReloadService,
        private svcDwellingService: DwellingService,
        private readonly joyrideService: JoyrideService,
        private readonly svcTranslate: TranslateService
    ) {}

    public ngOnInit(): void {
        //reload dwellings
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadDwellings();
            }
        });
    }

    public ngAfterViewInit() {
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
        goToDwelling(this.router, queryParams);
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

    // Function to launch joyride to start tour in Dwellings
    public tour() {
        // Send step to joyride
        let steps: string[] = ['DwellingCreateStep', 'DwellingFilterStep', 'DwellingMapStep'];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }
    //private method , load dwelling
    private loadDwellings() {
        this.svcDwelling.clean();
        this.svcDwelling.get().then((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
            this.dataSource.filterPredicate = (data: DwellingDetail, filter: string): boolean => {
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
