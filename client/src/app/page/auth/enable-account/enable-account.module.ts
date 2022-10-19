import { NotificationModule } from 'src/app/components/notification/notification.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnableAccountComponent } from './enable-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [EnableAccountComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        NotificationModule,
        MatDividerModule,
        MatIconModule,
        MatTooltipModule,
        TranslateModule,
        MatProgressBarModule,
    ],
    exports: [EnableAccountComponent],
})
export class EnableAccountModule {}
