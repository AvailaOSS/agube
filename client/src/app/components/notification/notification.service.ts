import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Configuration, Data, AlertType } from './configuration';
import { NotificationComponent } from './notification.component';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    // TODO: read default duration from Module configuration
    defaultDuration = 5;

    constructor(private _snackBar: MatSnackBar) {}

    public success(data: Data, durationInSeconds: number = this.defaultDuration) {
        this.notify({
            data,
            durationInSeconds,
            panelClass: AlertType.Success,
        });
    }

    public info(data: Data, durationInSeconds: number = this.defaultDuration) {
        this.notify({
            data,
            durationInSeconds,
            panelClass: AlertType.Info,
        });
    }

    public warning(data: Data, durationInSeconds: number = this.defaultDuration) {
        this.notify({
            data,
            durationInSeconds,
            panelClass: AlertType.Warning,
        });
    }

    public notify(config: Configuration) {
        let data: Data = config.data;
        this._snackBar.openFromComponent(NotificationComponent, {
            data,
            duration: config.durationInSeconds * 1000,
            panelClass: config.panelClass,
        });
    }
}
