import { Injectable, EventEmitter } from '@angular/core';
import { ThemeMode } from 'src/app/page/home/theme-mode';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public emiter: Subject<ThemeMode> = new Subject<ThemeMode>();
  constructor() {}

  getThemes() {
    let subs: any;
    this.emiter.subscribe((response) => {
      console.log('hola', response);
      subs = response;
    });
    return subs;
  }
}
