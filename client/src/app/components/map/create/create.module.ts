import { JoyrideModule } from 'ngx-joyride';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { PipesModule } from '../../../pipes/pipes.module';
import { GeolocationPipe } from 'src/app/pipes/geolocation.pipe';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MapModule } from '../map/map.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [CreateComponent],
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
    exports: [CreateComponent],
    providers: [GeolocationPipe],
})
export class CreateModule {}
