import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableReloadService {
  private reloadSubject: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);

  constructor() {}

  public reload() {
    return this.reloadSubject.asObservable();
  }

  public emitReload(reload: boolean) {
    this.reloadSubject.next(reload);
  }
}
