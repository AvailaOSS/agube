import { ICacheService } from './interface-cache.service';
import { Injectable } from '@angular/core';
import { SpringSourceDetail, SpringSourceService } from '@availaoss/agube-rest-api';

@Injectable({
    providedIn: 'root',
})
export class SpringSourceCacheService implements ICacheService<SpringSourceDetail> {
    cache: SpringSourceDetail[] = [];

    constructor(private svcSpringSource: SpringSourceService) {}

    public get(): Promise<SpringSourceDetail[]> {
        var promise = new Promise<SpringSourceDetail[]>((resolve) => {
            if (this.cache.length > 0) {
                console.debug('SpringSources from cache');
                resolve(this.cache);
                return;
            }
            this.svcSpringSource.getSpringSources().subscribe({
                next: (response) => {
                    this.cache = response;
                    console.debug('SpringSources received directly from backend');
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
