import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpringSource, SpringSourceDetail, SpringSourceService } from '@availa/agube-rest-api';
import { goToWaterSource } from 'src/app/utils/redirections/redirector';
import { Detail } from '../../detail/detail';
import { TableReloadService } from './table-reload.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
    //fields to table
    public displayedColumns: string[] = ['full_address'];

    //table data sources
    public dataSource: MatTableDataSource<SpringSourceDetail> = new MatTableDataSource();
    public isSelected: SpringSourceDetail | undefined = undefined;

    // filter
    public filter = new FormControl('');

    // pagination
    public pageSide: number = 12;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private router: Router,
        private svcTableReload: TableReloadService,
        private svcWaterSource: SpringSourceService
    ) {}

    public ngAfterViewInit() {
        this.loadWaterSources();
    }

    public ngOnInit(): void {
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadWaterSources();
            }
        });
    }

    public goToNewWaterSource() {
        this.router.navigate(['manager/watersources/create']);
    }

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }

    public goToWaterSource(waterSource: SpringSource) {
        console.log(waterSource)
        const queryParams: Detail = {
            waterSourceId: waterSource.id!,
        };
        goToWaterSource(this.router, queryParams);
    }

    private loadWaterSources() {
        this.svcWaterSource.getSpringSources().subscribe((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
            this.dataSource.filterPredicate = (data: SpringSourceDetail, filter: string): boolean => {
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
