import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { NotificationModule } from '@availa/notification';
import { CreateRoutingModule } from './create-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CreateModule as StreetViewCreateModule } from '../../../components/street-view/create/create.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [CreateComponent],
  imports: [
    CommonModule,
    CreateRoutingModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NotificationModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    StreetViewCreateModule,
    TranslateModule,
    PipesModule,
  ],
  exports: [CreateComponent],
})
export class CreateModule {}
