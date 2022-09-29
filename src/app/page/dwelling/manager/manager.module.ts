import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ErrorInterceptor } from 'src/app/utils/error.interceptor';
import { WaterMeterModule } from '../../water-meter/water-meter.module';
import { InfoComponent } from './info/info.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { TableReloadService } from './table/table-reload.service';
import { TableComponent } from './table/table.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MapModule } from 'src/app/components/map/map/map.module';

@NgModule({
    declarations: [ManagerComponent, TableComponent, InfoComponent],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        PipesModule,
        MatIconModule,
        WaterMeterModule,
        MatDividerModule,
        MatTooltipModule,
        TranslateModule,
        MatPaginatorModule,
        MatButtonToggleModule,
        MatSlideToggleModule,
        MapModule,
    ],
    providers: [TableReloadService, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
})
export class ManagerDwellingModule {}
