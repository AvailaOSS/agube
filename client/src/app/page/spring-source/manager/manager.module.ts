import { JoyrideModule } from 'ngx-joyride';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MapModule } from 'src/app/components/map/map/map.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ErrorInterceptor } from 'src/app/utils/error.interceptor';
import { InfoComponent } from './info/info.component';
import { ManagerSpringSourceRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { TableReloadService } from './table/table-reload.service';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [ManagerComponent, TableComponent, InfoComponent],
    imports: [
        CommonModule,
        ManagerSpringSourceRoutingModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        PipesModule,
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        MatPaginatorModule,
        MapModule,
        JoyrideModule,
    ],
    providers: [TableReloadService, { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
})
export class ManagerSpringSourceModule {}
