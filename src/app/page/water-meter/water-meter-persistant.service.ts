import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaterMeterPersistantService {
  private subjectReload: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);

  private subjectCode: BehaviorSubject<
    string | undefined
  > = new BehaviorSubject<string | undefined>(undefined);

  constructor() {}

  public getCode() {
    return this.subjectCode;
  }

  public emitCode(code: string) {
    this.subjectCode.next(code);
    this.emitReload(true);
  }

  public reload() {
    return this.subjectReload;
  }

  private emitReload(reload: boolean) {
    this.subjectReload.next(reload);
  }
}
