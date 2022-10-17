import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PersonalInfoPersistantService {
    private subjectReload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private subject: BehaviorSubject<any | undefined> = new BehaviorSubject<any | undefined>(undefined);

    constructor() {}

    public get() {
        return this.subject;
    }

    public emit(personal: boolean) {
        this.subject.next(personal);
        this.emitReload(true);
    }

    public reload() {
        return this.subjectReload;
    }

    private emitReload(reload: boolean) {
        this.subjectReload.next(reload);
    }
}
