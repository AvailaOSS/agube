import { Injectable } from '@angular/core';
import { WaterMeter } from '@availaoss/agube-rest-api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WaterMeterPersistantService {
    private subjectReload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private subject: BehaviorSubject<WaterMeter | undefined> = new BehaviorSubject<WaterMeter | undefined>(undefined);

    constructor() {}

    public get() {
        return this.subject;
    }

    public clear() {
        this.subject.next(undefined);
    }

    public emit(waterMeter: WaterMeter) {
        this.subject.next(waterMeter);
        this.emitReload(true);
    }

    public reload() {
        return this.subjectReload;
    }

    private emitReload(reload: boolean) {
        this.subjectReload.next(reload);
    }
}
