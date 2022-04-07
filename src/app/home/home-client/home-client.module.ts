import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeClientRoutingModule } from './home-client-routing.module';
import { HomeClientComponent } from './home-client.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [HomeClientComponent],
  imports: [
    CommonModule,
    HomeClientRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
  ],
})
export class HomeClientModule {}
