import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WaterMeterMeasurement, WaterMeterWithMeasurements } from '@availa/agube-rest-api';
import { WaterMeterMeasurementsPagination } from '@availa/agube-rest-api/lib/model/waterMeterMeasurementsPagination';
import { format } from 'date-fns';
import { range } from 'rxjs';
import { WaterMeterGauge } from '../gauge/water-meter-gauge';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';
import { DateMeasurementFilter } from './date-measurement-filter';
import { OurService } from './get-propierties.service';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { Type } from './type';

@Component({
    selector: 'app-water-meter-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    public properties: any;
    public next: string = '';
    public previous: string = '';
    public page: number | undefined;
    public pageIndex: number | undefined = 1;

    @Input() public waterMeterId: number | undefined;
    @Input() public type: Type | undefined;
    @Input() public canAddReading: boolean | undefined;

    public waterMeter: WaterMeterGauge | undefined;
    public waterMeterCode: string | undefined;
    public noData: boolean = false;
    public displayedColumns: string[] = ['measurement', 'date', 'measurement_diff'];
    public dataSource: MatTableDataSource<WaterMeterMeasurement> = new MatTableDataSource<WaterMeterMeasurement>();

    public filter = new FormControl('');

    public chunks = ['3', '5', '10'];
    public chunk: string = this.chunks[0];
    public dateStart = new FormControl(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1), [
        Validators.required,
    ]);
    public dateEnd = new FormControl(new Date(), [Validators.required]);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        protected svcWaterMeterManager: WaterMeterManager,
        public dialog: MatDialog,
        protected svcPersistance: WaterMeterPersistantService,
        public propertiesServices: OurService
    ) {}

    ngOnInit(): void {
        this.loadWaterMeterMeasures();
    }

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public clearFilter() {
        this.filter.setValue('');
        this.dataSource.filter = '';
    }

    public openMeasureDialog() {
        if (!this.waterMeterId) {
            return;
        }
        let data: MeasureDialogData = {
            waterMeterId: this.waterMeterId,
            lastMeasurement: this.dataSource.data[0],
        };
        const dialogRef = this.dialog.open(MeasureDialogComponent, {
            hasBackdrop: true,
            width: '600px',
            disableClose: true,
            data,
        });

        dialogRef.afterClosed().subscribe((reload) => {
            if (reload) {
                this.ngOnInit();
            }
        });
    }

    public isOverflow(measure: WaterMeterMeasurement) {
        if (
            measure.measurement_diff &&
            measure.max_daily_consumption &&
            measure.measurement_diff > measure.max_daily_consumption
        ) {
            return true;
        } else {
            return false;
        }
    }

    public setProperties(url: string) {
        this.propertiesServices.getProperties(url).subscribe((response) => {
            this.dataSource = new MatTableDataSource(response.results);
            this.dataSource.paginator = this.paginator!;
            this.page = response.num_pages;

            if (response.links.next) {
                // set the components next property here from the response
                this.next = response.links.next;
            }
            if (response.links.previous) {
                // set the components previous property here from the response
                this.previous = response.links.previous;
            }
        });
    }
    // function fetches the next paginated items by using the url in the next property
    public fetchNext(index: number) {
        this.setProperties(this.next);
        if (index >= this.page!) {
            this.pageIndex = this.page;
        } else {
            this.pageIndex! += 1;
        }
    }
    // function fetches the previous paginated items by using the url in the previous property
    public fetchPrevious(index: number) {
        this.setProperties(this.previous);
        if (index === 1) {
            this.pageIndex! = 1;
        } else {
            this.pageIndex! -= 1;
        }
    }

    public loadWaterMeterMeasures() {
        let date: DateMeasurementFilter;
        if (!this.type?.id!) {
            return;
        }

        if (this.dateEnd.value >= this.dateStart.value) {
            date = {
                dateStart: format(this.dateStart.value, 'yyyy-MM-dd'),
                dateEnd: format(this.dateEnd.value, 'yyyy-MM-dd'),
            };

            this.svcPersistance.get().subscribe((waterMeter) => {
                let water: WaterMeterWithMeasurements;
                water = {
                    measures: [],
                };

                this.waterMeter = {
                    waterMeter: waterMeter!,
                    waterMeterWithMeasure: water,
                };
            });
            this.svcWaterMeterManager.getChunk(this.type?.id!, +this.chunk, date, this.type?.type).subscribe({
                next: (response: WaterMeterMeasurementsPagination) => {
                    if (!response) {
                        return;
                    }
                    this.previous = response.links!.previous!;
                    this.next = response.links!.next!;
                    this.page = response.num_pages;
                    this.pageIndex = 1;
                    this.noData = false;
                    this.dataSource = new MatTableDataSource(response.results);
                    this.dataSource.paginator = this.paginator!;
                },
                error: (error: any) => {
                    this.noData = true;
                    this.dataSource = new MatTableDataSource();
                    this.dataSource.paginator = this.paginator!;
                },
            });
        }
    }
}
