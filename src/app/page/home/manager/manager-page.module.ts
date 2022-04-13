import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerPageRoutingModule } from './manager-page-routing.module';
import { ManagerPageComponent } from './manager-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [ManagerPageComponent],
  imports: [
    CommonModule,
    ManagerPageRoutingModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    TranslateModule,
    PipesModule,
  ],
})
export class ManagerPageModule {}
