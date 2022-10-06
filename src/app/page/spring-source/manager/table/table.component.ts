import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SpringSource, SpringSourceDetail } from '@availa/agube-rest-api';
import { SpringSourceCacheService } from 'src/app/utils/cache/spring-source-cache.service';
import { goToSpringSource } from 'src/app/utils/redirections/redirector';
import { Detail } from '../../detail/detail';
import { TableReloadService } from './table-reload.service';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
    // fields to table
    public displayedColumns: string[] = ['full_address'];

    // table data sources
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
        private svcSpringSourceCache: SpringSourceCacheService
    ) {}

    public ngOnInit(): void {
        // Reload spring sources
        this.svcTableReload.reload().subscribe((reload) => {
            if (reload) {
                this.loadSpringSources();
            }
        });
    }

    public ngAfterViewInit() {
        this.loadSpringSources();
    }

    // Go to create spring sources
    public goToNewSpringSource() {
        this.router.navigate(['manager/springsources/create']);
    }

    // Apply filter in table
    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    // clear filter table
    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }

    // Go to spring source detail , click in table
    public goToSpringSource(springSource: SpringSource) {
        const queryParams: Detail = {
            springSourceId: springSource.id!,
        };
        goToSpringSource(this.router, queryParams);
    }

    // Load spring source
    private loadSpringSources() {
        this.svcSpringSourceCache.clean();
        this.svcSpringSourceCache.get().then((response) => {
            this.dataSource = new MatTableDataSource(response);
            this.dataSource.paginator = this.paginator!;
            // Ignore accents in filters
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
