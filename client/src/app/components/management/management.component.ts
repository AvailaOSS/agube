import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DwellingCreate, ReservoirCreate } from '@availaoss/agube-rest-api';
import { WaterMeterDialogData } from 'src/app/page/water-meter/dialog/dialog-data';
import { WaterMeterDialogComponent } from 'src/app/page/water-meter/dialog/dialog.component';
import { WaterMeterPersistantService } from 'src/app/page/water-meter/water-meter-persistant.service';
import { Type } from '../../page/water-meter/detail/type';
@Component({
    selector: 'app-management',
    styleUrls: ['./management.component.scss'],
    templateUrl: './management.component.html',
})
export class ManagementComponent implements OnInit {
    @Input() public manage: DwellingCreate | ReservoirCreate | undefined;
    @Input() public waterMeterId: number | undefined;
    @Input() public type: Type | undefined;
    @Input() public load = false;
    @Input() public reservoir? = false;

    constructor(private dialog: MatDialog, private svcPersistant: WaterMeterPersistantService) {}

    ngOnInit(): void {
        if (!this.manage?.id) {
            return;
        }
    }

    public openChangeWaterMeter() {
        const data: WaterMeterDialogData = {
            id: this.manage?.id!,
            type: this.type?.type!,
        };
        this.dialog.open(WaterMeterDialogComponent, {
            data,
            disableClose: true,
            hasBackdrop: true,
            width: '600px',
        });
        this.dialog.afterAllClosed.subscribe(() => {
            this.svcPersistant.get().subscribe((response) => {
                if (response) {
                    this.waterMeterId = response.id;
                }
            });
        });
    }
}
