import { Injectable } from '@angular/core';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';

@Injectable({
    providedIn: 'root',
})
export class DwellingCacheService {
    private dwellings: DwellingDetail[] = [];

    constructor(private svcDwelling: DwellingService) {}

    public getDwellings(): Promise<DwellingDetail[]> {
        var promise = new Promise<DwellingDetail[]>((resolve, reject) => {
            if (this.dwellings.length > 0) {
                console.debug('dwellings from cache');
                resolve(this.dwellings);
                return;
            }
            this.svcDwelling.getDwellings().subscribe((response) => {
                this.dwellings = response;
                console.debug('dwellings received directly from backend');
                resolve(this.dwellings);
                return;
            });
        });
        return promise;
    }

    public clean(): void {
        this.dwellings = [];
    }
}
