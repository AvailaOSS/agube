import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerPageRoutingModule } from './manager-page-routing.module';
import { ManagerPageComponent } from './manager-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ParametersComponent } from './parameters/parameters.component';
import { NotificationModule } from '@availa/notification';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ContactBookModule } from '@availa/contact-book-fe';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [ManagerPageComponent, ParametersComponent],
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
        ContactBookModule.forRoot({
            contactBookRestconfig: { basePath: environment.contactBookBackendUrl },
        }),
    ],
})
export class ManagerPageModule {}
