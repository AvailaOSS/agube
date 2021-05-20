import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Alert, AlertType } from './alert.model';
@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private subject = new Subject<Alert>();
  private defaultId = 'default-alert';
  keepAfterRouteChange: unknown;

  // enable subscribing to alerts observable
  public onAlert(id = this.defaultId): Observable<Alert> {
    return this.subject.asObservable().pipe(filter((x) => x && x.id === id));
  }

  // convenience methods
  public success(message: string, options?: any): void {
    this.alert(new Alert({ ...options, type: AlertType.Success, message }));
  }

  public error(message: string, options?: any): void {
    console.log(message);
    this.alert(new Alert({ ...options, type: AlertType.Error, message }));
  }

  public info(message: string, options?: any): void {
    this.alert(new Alert({ ...options, type: AlertType.Info, message }));
  }

  public warn(message: string, options?: any): void {
    this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
  }

  // main alert method
  public alert(alert: Alert): void {
    alert.id = alert.id || this.defaultId;
    this.subject.next(alert);
  }

  // clear alerts
  public clear(id = this.defaultId): void {
    this.subject.next(new Alert({ id }));
  }
}
