import { Component, OnInit } from '@angular/core';
import { ReservoirDetail } from '@availaoss/agube-rest-api';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';

@Component({
    selector: 'app-manager-reservoir',
    styleUrls: ['./manager.component.scss'],
    templateUrl: './manager.component.html',
})
export class ManagerComponent implements OnInit {
    public element: ReservoirDetail | undefined;

    // map config parameters
    public configureMap: ConfigureMap | undefined;
    private readonly mapId: string = 'manager_full_reservoir_map';
    private readonly mapZoom: number = 14;
    private readonly mapHeight: string = '450px';
    private readonly mapWidth: string = '850px';

    constructor(private svcReservoirCache: ReservoirCacheService) {}

    public ngOnInit(): void {
        this.loadMap();
    }

    private loadMap() {
        // get location from reservoirs
        this.svcReservoirCache.get().then((response) => {
            // check if has reservoirs, else ignore it
            if (response && response.length > 0) {
                // get first result
                var firstReservoirDetected: ReservoirDetail = response[0];
                // set location around the first reservoir
                var buildConfigMap: ConfigureMap = {
                    id: this.mapId,
                    center: {
                        lat: String(firstReservoirDetected.latitude!),
                        lon: String(firstReservoirDetected.longitude!),
                        type: MapIconType.RESERVOIR,
                    },
                    zoom: this.mapZoom,
                    showMarker: true,
                    height: this.mapHeight,
                    width: this.mapWidth,
                    dragging: true,
                    scrollWheelZoom: true,
                };
                // add others Reservoirs in the map
                buildConfigMap.otherPoints = response.map((reservoir) => build(reservoir));
                // replace the undefined config with built config
                this.configureMap = buildConfigMap;
            }
        });
    }
}
