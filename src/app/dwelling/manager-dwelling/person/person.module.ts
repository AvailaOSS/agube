import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeComponent } from './change/change.component';
import { ResidentComponent } from './change/resident/resident.component';
import { OwnerComponent } from './change/owner/owner.component';
import { PersonRoutingModule } from './person-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NotificationModule } from '@availa/notification';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ChangeComponent, ResidentComponent, OwnerComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NotificationModule,
    PipesModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconModule,
    TranslateModule,
  ],
})
export class PersonModule {}
