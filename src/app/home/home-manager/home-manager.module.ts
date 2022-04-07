import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeManagerRoutingModule } from './home-manager-routing.module';
import { HomeManagerComponent } from './home-manager.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [HomeManagerComponent],
  imports: [
    CommonModule,
    HomeManagerRoutingModule,
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
export class HomeManagerModule {}
