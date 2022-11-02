import { Component, OnInit } from '@angular/core';
import { DwellingDetail } from '@availaoss/agube-rest-api';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';
import { TableReloadService } from './table/table-reload.service';

@Component({
    selector: 'app-page-dwelling-manager',
    styleUrls: ['./manager.component.scss'],
    templateUrl: './manager.component.html',
})
export class ManagerComponent implements OnInit {
    // map config parameters
    public configureMap: ConfigureMap | undefined;
    private readonly mapId: string = 'manager_full_houses_map';
    private readonly mapZoom: number = 14;
    private readonly mapHeight: string = '450px';
    private readonly mapWidth: string = '850px';

    constructor(private svcTableReload: TableReloadService, private svcDwellingCache: DwellingCacheService) {}

    public ngOnInit(): void {
        this.loadMap();
    }

    public waterMeterChanged(change: boolean) {
        this.svcTableReload.emitReload(change);
    }

    private loadMap() {
        // get location from dwellings
        this.svcDwellingCache.get().then((response) => {
            // check if has dwellings, else ignore it
            if (response && response.length > 0) {
                // get first result
                var firstDwellingDetected: DwellingDetail = response[0];
                // set location around the first dwelling
                const buildConfigMap: ConfigureMap = {
                    center: {
                        lat: String(firstDwellingDetected.latitude!),
                        lon: String(firstDwellingDetected.longitude!),
                        type: MapIconType.HOUSE,
                    },
                    dragging: true,
                    height: this.mapHeight,
                    id: this.mapId,
                    scrollWheelZoom: true,
                    showMarker: true,
                    width: this.mapWidth,
                    zoom: this.mapZoom,
                };
                // add others dwellings in the map
                buildConfigMap.otherPoints = response.map((dwelling) => build(dwelling));
                // replace the undefined config with built config
                this.configureMap = buildConfigMap;
            }
        });
    }
}
