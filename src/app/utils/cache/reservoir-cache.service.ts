import { ICacheService } from './interface-cache.service';
import { Injectable } from '@angular/core';
import { ReservoirDetail, ReservoirService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';

@Injectable({
    providedIn: 'root',
})
export class ReservoirCacheService implements ICacheService<ReservoirDetail> {
    cache: ReservoirDetail[] = [];

    constructor(private svcReservoir: ReservoirService, private svcAccount: AccountService) {}

    public get(): Promise<ReservoirDetail[]> {
        var promise = new Promise<ReservoirDetail[]>((resolve, reject) => {
            if (this.cache.length > 0) {
                console.debug('reservoirs from cache');
                resolve(this.cache);
                return;
            }
            this.svcReservoir.getReservoirs().subscribe({
                next: (response) => {
                    this.cache = response;
                    console.debug('reservoirs received directly from backend');
                    resolve(this.cache);
                    return;
                }
            });
        });
        return promise;
    }

    public clean(): void {
        this.cache = [];
    }
}
