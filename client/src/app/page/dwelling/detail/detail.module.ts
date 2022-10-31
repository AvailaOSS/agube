import { JoyrideModule } from 'ngx-joyride';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { AddressModule } from 'src/app/components/address/address.module';
import { CommentModule } from 'src/app/components/comment/comment.module';
import { DialogOnlyMapModule } from 'src/app/components/dialog-only-map/dialog-only-map.module';
import { DialogModule } from 'src/app/components/dialog/dialog.module';
import { MapModule } from 'src/app/components/map/map/map.module';
import { StreetViewModule } from 'src/app/components/map/view/view.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ManagementModule } from '../../../components/management/management.module';
import { GaugeModule as WaterMeterGaugeModule } from '../../water-meter/gauge/gauge.module';
import { WaterMeterModule } from '../../water-meter/water-meter.module';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { OwnerComponent } from './owner/owner.component';
import { ResidentComponent } from './resident/resident.component';

@NgModule({
    declarations: [DetailComponent, ResidentComponent, OwnerComponent],
    imports: [
        CommonModule,
        DetailRoutingModule,
        StreetViewModule,
        MatCardModule,
        MatButtonModule,
        PipesModule,
        MapModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        WaterMeterGaugeModule,
        WaterMeterModule,
        MatProgressSpinnerModule,
        ManagementModule,
        DialogModule,
        AddressModule,
        DialogOnlyMapModule,
        CommentModule,
        JoyrideModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
    ],
})
export class DetailModule {}
