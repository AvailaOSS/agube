import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CreateRoutingModule } from './create-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotificationModule } from 'src/app/components/notification/notification.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CreateModule as StreetViewCreateModule } from '../../../components/map/create/create.module';
import { PipesModule } from '../../../pipes/pipes.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

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
        MatProgressBarModule,
        MatTooltipModule,
        MatIconModule,
        TranslateModule,
        StreetViewCreateModule,
        PipesModule,
        MatAutocompleteModule,
    ],
})
export class CreateModule {}
