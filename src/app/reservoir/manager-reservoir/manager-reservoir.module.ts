import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerReservoirRoutingModule } from './manager-reservoir-routing.module';
import { ManagerReservoirComponent } from './manager-reservoir.component';
import { WaterMeterModule } from 'src/app/water-meter/water-meter.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';
import { CardManagementComponent } from './card-management/card-management.component';
import { DetailReservoirComponent } from './card-management/detail-reservoir/detail-reservoir.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ManagerReservoirComponent,
    TableComponent,
    CardManagementComponent,
    DetailReservoirComponent,
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
    TranslateModule
  ],
})
export class ManagerReservoirModule {}
