import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { NotificationModule } from 'src/app/components/notification/notification.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    declarations: [ResetPasswordComponent],
    exports: [ResetPasswordComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        MatTooltipModule,
        NotificationModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
})
export class ResetPasswordModule {}
