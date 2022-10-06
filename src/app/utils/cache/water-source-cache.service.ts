import { ICacheService } from './interface-cache.service';
import { Injectable } from '@angular/core';
import { SpringSourceDetail, SpringSourceService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';

@Injectable({
    providedIn: 'root',
})
export class WaterSourceCacheService implements ICacheService<SpringSourceDetail> {
    cache: SpringSourceDetail[] = [];

    constructor(private svcWaterSource: SpringSourceService, private svcAccount: AccountService) {}

    public get(): Promise<SpringSourceDetail[]> {
        var promise = new Promise<SpringSourceDetail[]>((resolve, reject) => {
            if (this.cache.length > 0) {
                console.debug('WaterSources from cache');
                resolve(this.cache);
                return;
            }
            this.svcWaterSource.getSpringSources().subscribe({
                next: (response) => {
                    this.cache = response;
                    console.debug('WaterSources received directly from backend');
                    resolve(this.cache);
                    return;
                },
            });
        });
        return promise;
    }

    public clean(): void {
        this.cache = [];
    }
}
