import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DwellingCreate, ReservoirCreate } from '@availa/agube-rest-api';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { Type } from '../../page/water-meter/detail/type';
@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.scss'],
})
export class ManagementComponent implements OnInit {
    @Input() public manage: DwellingCreate | ReservoirCreate | undefined;
    @Input() public waterMeterId: number | undefined;
    @Input() public type: Type | undefined;
    @Input() public load: boolean = false;
    @Input() public reservoir?: boolean = false;

    constructor( private dialog: MatDialog) {}
    ngOnInit(): void {
        if (!this.manage?.id) {
            return;
        }

    }

    public openChangeWaterMeter() {
        let data: WaterMeterDialogData = {
            id: this.manage?.id!,
            type: this.type?.type!,
        };
        this.dialog.open(WaterMeterDialogComponent, {
            hasBackdrop: true,
            width: '600px',
            disableClose: true,
            data,
        });
    }


}
