import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { MapModule } from '../map/map.module';
import { JoyrideModule } from 'ngx-joyride';

@NgModule({
    declarations: [EditComponent],
    imports: [
        CommonModule,
        GoogleMapsModule,
        HttpClientModule,
        PipesModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        MatTooltipModule,
        MapModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        JoyrideModule,
    ],
    exports: [EditComponent],
})
export class EditModule {}
