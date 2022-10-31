import { JoyrideModule } from 'ngx-joyride';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MapModule } from 'src/app/components/map/map/map.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { WaterMeterModule } from '../../water-meter/water-meter.module';
import { InfoComponent } from './info/info.component';
import { ManagerReservoirRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [ManagerComponent, TableComponent, InfoComponent],
    imports: [
        CommonModule,
        ManagerReservoirRoutingModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        PipesModule,
        MatDividerModule,
        MatIconModule,
        WaterMeterModule,
        MatTooltipModule,
        TranslateModule,
        MatPaginatorModule,
        MapModule,
        JoyrideModule,
    ],
})
export class ManagerModule {}
