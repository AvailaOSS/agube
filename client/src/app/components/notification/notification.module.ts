import { NgModule } from '@angular/core';
import { NotificationComponent } from './notification.component';
import { NotificationService } from './notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [NotificationComponent],
    imports: [MatSnackBarModule, MatFormFieldModule],
    exports: [],
    providers: [NotificationService],
})
export class NotificationModule {}
