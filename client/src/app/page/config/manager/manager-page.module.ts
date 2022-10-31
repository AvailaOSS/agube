import { JoyrideModule } from 'ngx-joyride';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationModule } from 'src/app/components/notification/notification.module';
import { TranslateModule } from '@ngx-translate/core';
import { ManagerPageRoutingModule } from './manager-page-routing.module';
import { ManagerPageComponent } from './manager-page.component';
import { ParametersComponent } from './parameters/parameters.component';
import { ConfigurationEmailComponent } from './configuration-email/configuration-email.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
    declarations: [ManagerPageComponent, ParametersComponent, ConfigurationEmailComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        ManagerPageRoutingModule,
        MatCardModule,
        NotificationModule,
        MatDividerModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTooltipModule,
        MatProgressBarModule,
        TranslateModule,
        MatAutocompleteModule,
        MatSlideToggleModule,
        JoyrideModule,
    ],
})
export class ManagerPageModule {}
