import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeRoutingModule } from './change-routing.module';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChangeComponent } from './change.component';
import { OwnerComponent } from './owner/owner.component';
import { ResidentComponent } from './resident/resident.component';

@NgModule({
    declarations: [ChangeComponent, ResidentComponent, OwnerComponent],
    imports: [
        CommonModule,
        ChangeRoutingModule,
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
        MatAutocompleteModule,
    ],
})
export class ChangeModule {}
