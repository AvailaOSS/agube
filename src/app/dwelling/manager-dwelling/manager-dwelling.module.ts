import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerDwellingRoutingModule } from './manager-dwelling-routing.module';
import { ManagerDwellingComponent } from './manager-dwelling.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CardManagementComponent } from './card-management/card-management.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ResidentContentComponent } from './card-management/resident-content/resident-content.component';
import { MatIconModule } from '@angular/material/icon';
import { WaterMeterModule } from 'src/app/water-meter/water-meter.module';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ManagerDwellingComponent,
    TableComponent,
    CardManagementComponent,
    ResidentContentComponent,
  ],
  imports: [
    CommonModule,
    ManagerDwellingRoutingModule,
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
  ],
})
export class ManagerDwellingModule {}
