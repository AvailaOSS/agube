import { Injectable } from '@angular/core';
import { DwellingCacheService } from './dwelling-cache.service';
import { ReservoirCacheService } from './reservoir-cache.service';

@Injectable({
    providedIn: 'root',
})
export class CleanerCacheService {
    constructor(private svcDwellingCache: DwellingCacheService, private svcReservoirCache: ReservoirCacheService) {}

    public clean() {
        console.debug('cache cleared completely');
        this.svcDwellingCache.clean();
        this.svcReservoirCache.clean();
    }
}
