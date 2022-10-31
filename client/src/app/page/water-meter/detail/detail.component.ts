import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WaterMeterMeasurement } from '@availaoss/agube-rest-api';
import { WaterMeterMeasurementsPagination } from '@availaoss/agube-rest-api';
import { differenceInDays, differenceInHours, differenceInMinutes, parseISO } from 'date-fns';
import { dateValidator } from 'src/app/utils/date/date-filter';
import { WaterMeterGauge } from '../gauge/water-meter-gauge';
import { WaterMeterPersistantService } from '../water-meter-persistant.service';
import { WaterMeterManager } from '../water-meter.manager';
import { GetPropertiesService } from './get-propierties.service';
import { MeasureDialogData } from './measure-dialog/measure-dialog-data';
import { MeasureDialogComponent } from './measure-dialog/measure-dialog.component';
import { MeasureEditDialogData } from './measure-edit-dialog/measure-edit-dialog-data';
import { MeasureEditDialogComponent } from './measure-edit-dialog/measure-edit-dialog.component';
import { Type } from './type';

@Component({
    selector: 'app-water-meter-detail',
    styleUrls: ['./detail.component.scss'],
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
    // inputs
    @Input() public waterMeterId: number | undefined;
    @Input() public reservoirId: number | undefined;
    @Input() public dwellingId: number | undefined;
    @Input() public type: Type | undefined;
    @Input() public canAddReading: boolean | undefined;

    // used WaterMeterGauge for child classes that will extends it
    public waterMeter: WaterMeterGauge | undefined;

    // pagination
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    public pages = ['5', '10', '15'];
    public pageSize: number = +this.pages[0];
    public page: number | undefined;
    public pageIndex: number | undefined = 1;

    // table
    public displayedColumns: string[] = ['measurement', 'date', 'daysApart', 'measurement_diff'];
    public dataSource: MatTableDataSource<WaterMeterMeasurement> = new MatTableDataSource<WaterMeterMeasurement>();
    public filter = new FormControl('');

    // dates
    public dateStart = new FormControl();
    public dateEnd = new FormControl();
    public isFirstDateValid: boolean = true;

    // others ?
    public next: string = '';
    public previous: string = '';
    public properties: any;

    private readonly measureAllowEdit: number = 24;

    constructor(
        protected svcWaterMeterManager: WaterMeterManager,
        public dialog: MatDialog,
        protected svcWaterMeterPersistance: WaterMeterPersistantService,
        public propertiesServices: GetPropertiesService
    ) {
        this.initializeDates();
    }

    public ngOnInit(): void {
        this.loadWaterMeterMeasures();
        this.getWaterMeter([]);
    }

    public computeDaysApart(measurement: WaterMeterMeasurement, index: number): number {
        let previousMeasurement = this.dataSource.data[index + 1];

        if (!previousMeasurement) {
            return 0;
        }

        let current = new Date(measurement.date!);
        let previous = new Date(previousMeasurement.date!);

        let diff = differenceInDays(current, previous);
        if (diff <= 0) {
            return Math.round((differenceInMinutes(current, previous) / 60 / 24) * 100) / 100;
        }
        return diff;
    }

    public applyFilter() {
        this.dataSource.filter = this.filter.value.trim().toLowerCase();
    }

    public openEditMeasureDialog() {
        let data: MeasureEditDialogData = {
            currentMeasurement: this.dataSource.data[0],
        };

        const dialogRef = this.dialog.open(MeasureEditDialogComponent, {
            hasBackdrop: true,
            width: '600px',
            disableClose: true,
            data,
        });

        dialogRef.afterClosed().subscribe((reload) => {
            if (reload) {
                this.ngOnInit();
                this.svcWaterMeterPersistance.emit(this.waterMeter!.waterMeter);
            }
        });
    }

    public clearFilter() {
        this.dateStart.setValue(null);
        this.loadWaterMeterMeasures();
    }

    public clearFilterEnd() {
        this.dateEnd.setValue(null);
        this.loadWaterMeterMeasures();
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
                this.svcWaterMeterPersistance.emit(this.waterMeter!.waterMeter);
            }
        });
    }

    public isMeasurementEditable(measure: WaterMeterMeasurement) {
        if (!measure.date) {
            return;
        }

        const difference = differenceInHours(new Date(), parseISO(String(measure.date)));

        if (this.measureAllowEdit > difference) {
            return true;
        } else {
            return false;
        }
    }

    public isOverflow(measure: WaterMeterMeasurement) {
        if (
            measure.average_daily_flow &&
            measure.max_daily_consumption &&
            measure.average_daily_flow > measure.max_daily_consumption
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
        if (this.next !== null) {
            this.setProperties(this.next);
            if (index >= this.page!) {
                this.pageIndex = this.page;
            } else {
                this.pageIndex! += 1;
            }
        }
    }

    // function fetches the previous paginated items by using the url in the previous property
    public fetchPrevious(index: number) {
        if (this.previous !== null) {
            this.setProperties(this.previous);
            if (index === 1) {
                this.pageIndex! = 1;
            } else {
                this.pageIndex! -= 1;
            }
        }
    }

    public loadWaterMeterMeasures() {
        if (!this.type?.id!) {
            return;
        }

        let validDate = dateValidator(this.dateStart, this.dateEnd);

        this.svcWaterMeterManager.getPaginated(this.type?.id!, this.pageSize, validDate, this.type?.type).subscribe({
            next: (response: WaterMeterMeasurementsPagination) => {
                if (!response || response.results.length <= 0) {
                    this.isFirstDateValid = true;
                    this.dataSource = new MatTableDataSource();
                    return;
                }

                this.previous = response.links!.previous!;
                this.next = response.links!.next!;
                this.page = response.num_pages;
                this.pageIndex = 1;
                this.isFirstDateValid = true;
                this.dataSource = new MatTableDataSource(response.results);
                this.dataSource.paginator = this.paginator!;
                this.getWaterMeter(response.results);
            },
            error: (error: any) => {
                this.isFirstDateValid = false;
                this.dataSource = new MatTableDataSource();
                this.dataSource.paginator = this.paginator!;
            },
        });
    }

    private initializeDates() {
        let dates = dateValidator(this.dateStart, this.dateEnd);
        this.dateStart.setValue('');
        this.dateEnd.setValue(dates.dateEnd);
        this.isFirstDateValid = true;
    }

    private getWaterMeter(measures: WaterMeterMeasurement[]) {
        this.svcWaterMeterPersistance.get().subscribe((waterMeter) => {
            this.waterMeter = {
                waterMeter: waterMeter!,
                dwellingId: this.dwellingId,
                reservoirId: String(this.reservoirId) || undefined,
                waterMeterWithMeasure: {
                    measures: measures,
                },
            };
        });
    }
}
