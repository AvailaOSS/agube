import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerConfigRoutingModule } from './manager-config-routing.module';
import { ManagerConfigComponent } from './manager-config.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParametersComponent } from './parameters/parameters.component';
import { NotificationModule } from '@availa/notification';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    ManagerConfigComponent,
    ParametersComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ManagerConfigRoutingModule,
    MatCardModule,
    NotificationModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTooltipModule,
  ],
})
export class ManagerConfigModule {}
