import { Component, OnInit } from '@angular/core';
import { ReservoirDetail } from '@availa/agube-rest-api';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';

@Component({
    selector: 'app-manager-water-source',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
    public element: ReservoirDetail | undefined;

    // map config parameters
    public configureMap: ConfigureMap | undefined;
    private readonly mapId: string = 'manager_full_water_sources_map';
    private readonly mapZoom: number = 14;
    private readonly mapHeight: string = '450px';
    private readonly mapWidth: string = '850px';

    constructor(private svcReservoirCache: ReservoirCacheService) {}

    public ngOnInit(): void {
        this.loadMap();
    }

    private loadMap() {
        // get location from watersource
        this.svcReservoirCache.get().then((response) => {
            // check if has watersource, else ignore it
            if (response && response.length > 0) {
                // get first result
                var firstReservoirDetected: ReservoirDetail = response[0];
                // set location around the first watersource
                var buildConfigMap: ConfigureMap = {
                    id: this.mapId,
                    center: {
                        lat: String(firstReservoirDetected.latitude!),
                        lon: String(firstReservoirDetected.longitude!),
                        type: MapIconType.WATER_SOURCE,
                    },
                    zoom: this.mapZoom,
                    showMarker: true,
                    height: this.mapHeight,
                    width: this.mapWidth,
                    dragging: true,
                    scrollWheelZoom: true,
                };
                // add others watersource in the map
                buildConfigMap.otherPoints = response.map((watersource) => build(watersource));
                // replace the undefined config with built config
                this.configureMap = buildConfigMap;
            }
        });
    }
}
