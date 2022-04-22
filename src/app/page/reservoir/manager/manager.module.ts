import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerReservoirRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';
import { ManagementComponent } from './management/management.component';
import { ResumeComponent } from './management/resume/resume.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { WaterMeterModule } from '../../water-meter/water-meter.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    ManagerComponent,
    TableComponent,
    ManagementComponent,
    ResumeComponent,
  ],
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
  ],
})
export class ManagerModule {}
