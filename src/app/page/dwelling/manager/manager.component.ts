import { OnInit, Component } from '@angular/core';
import { DwellingDetail } from '@availa/agube-rest-api/public-api';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { build } from 'src/app/utils/coordinates/coordinates-builder';
import { TableReloadService } from './table/table-reload.service';

@Component({
    selector: 'app-page-dwelling-manager',
    templateUrl: './manager.component.html',
    styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
    // map config parameters
    public configureMap: ConfigureMap | undefined;
    private readonly mapId: string = 'manager_full_map';
    private readonly mapZoom: number = 16;
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
                var firstDwellingDetected: DwellingDetail = response[1];
                // set location around the first dwelling
                var buildConfigMap: ConfigureMap = {
                    id: this.mapId,
                    center: {
                        lat: String(firstDwellingDetected.latitude!),
                        lon: String(firstDwellingDetected.longitude!),
                    },
                    zoom: this.mapZoom,
                    showCircle: true,
                    height: this.mapHeight,
                    width: this.mapWidth,
                    dragging: true,
                    scrollWheelZoom: true,
                };
                // add others dwellings in the map
                buildConfigMap.otherPoints = response.map((dwelling) => build(dwelling));
                // replace the undefined config with built config
                this.configureMap = buildConfigMap;
            }
        });
    }
}
