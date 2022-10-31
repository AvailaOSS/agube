import { Component, OnInit } from '@angular/core';
import { SpringSourceDetail } from '@availaoss/agube-rest-api';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { SpringSourceCacheService } from 'src/app/utils/cache/spring-source-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';

@Component({
    selector: 'app-manager-spring-source',
    styleUrls: ['./manager.component.scss'],
    templateUrl: './manager.component.html',
})
export class ManagerComponent implements OnInit {
    public element: SpringSourceDetail | undefined;

    // map config parameters
    public configureMap: ConfigureMap | undefined;
    private readonly mapId: string = 'manager_full_water_sources_map';
    private readonly mapZoom: number = 14;
    private readonly mapHeight: string = '450px';
    private readonly mapWidth: string = '850px';

    constructor(private svcSpringSourceCache: SpringSourceCacheService) {}

    public ngOnInit(): void {
        this.svcSpringSourceCache.clean();
        this.loadMap();
    }

    private loadMap() {
        // get location from watersource
        this.svcSpringSourceCache.get().then((response) => {
            // check if has watersource, else ignore it
            if (response && response.length > 0) {
                // get first result
                var firstSpringSourceDetected: SpringSourceDetail = response[0];
                // set location around the first watersource
                var buildConfigMap: ConfigureMap = {
                    id: this.mapId,
                    center: {
                        lat: String(firstSpringSourceDetected.latitude!),
                        lon: String(firstSpringSourceDetected.longitude!),
                        type: MapIconType.SPRING_SOURCE,
                    },
                    zoom: this.mapZoom,
                    showMarker: true,
                    height: this.mapHeight,
                    width: this.mapWidth,
                    dragging: true,
                    scrollWheelZoom: true,
                };
                // add others spring source in the map
                buildConfigMap.otherPoints = response.map((springSource) => build(springSource));
                // replace the undefined config with built config
                this.configureMap = buildConfigMap;
            }
        });
    }
}
