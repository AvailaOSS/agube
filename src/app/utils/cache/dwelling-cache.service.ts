import { ICacheService } from './interface-cache.service';
import { Injectable } from '@angular/core';
import { DwellingDetail, DwellingService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';

@Injectable({
    providedIn: 'root',
})
export class DwellingCacheService implements ICacheService<DwellingDetail> {
    cache: DwellingDetail[] = [];

    constructor(private svcDwelling: DwellingService, private svcAccount: AccountService) {}

    public get(): Promise<DwellingDetail[]> {
        var promise = new Promise<DwellingDetail[]>((resolve, reject) => {
            if (this.cache.length > 0) {
                console.debug('dwellings from cache');
                resolve(this.cache);
                return;
            }
            this.svcDwelling.getDwellings().subscribe({
                next: (response) => {
                    this.cache = response;
                    console.debug('dwellings received directly from backend');
                    resolve(this.cache);
                    return;
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.svcAccount.logout();
                    }
                },
            });
        });
        return promise;
    }

    public clean(): void {
        this.cache = [];
    }
}
