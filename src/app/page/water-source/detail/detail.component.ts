import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Geolocation,
    GeolocationService,
    ManagerService,
    ReservoirCreate,
    ReservoirService,
    WaterMeter,
} from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { DialogOnlyMapComponent } from 'src/app/components/dialog-only-map/dialog-only-map.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { isStreetViewAvailable } from 'src/app/utils/cache/streetview-status';
import { Type } from '../../water-meter/detail/type';
import { WaterMeterPersistantService } from '../../water-meter/water-meter-persistant.service';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';
import { Detail } from './detail';

@Component({
    selector: 'app-reservoir',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    public waterSourceId: number | undefined;
    public waterSource: ReservoirCreate | undefined;

    // map
    public canLoadStreetView: boolean = false;
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;

    // map config
    public mode: string = 'map';
    private readonly mapType: MapIconType = MapIconType.WATER_SOURCE;
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '500px';
    private mapId: string = 'detail_map';
    public waterMeterId: number | undefined;
    public waterMeter: WaterMeter | undefined;

    public type: Type | undefined = undefined;

    public showMap: boolean = true;
    public loading: boolean = false;
    public canLoad: boolean = true;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private svcWaterSource: ReservoirService,
        private svcCacheWaterSource: ReservoirCacheService,
        private svcManager: ManagerService,
        private svcPersistant: WaterMeterPersistantService,
        public dialog: MatDialog,
        private svcGeolocation: GeolocationService,
        private svcNotification: NotificationService,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.canLoadStreetView = isStreetViewAvailable();
        this.googleAnalyticsService.pageView('view_water_source', '/detail_water_source');
        this.svcManager.userIsManager().subscribe({
            next: (response) => (this.canLoad = response.is_manager),
        });
        this.loading = true;
        this.waterSource = undefined;
        this.activatedRoute.queryParams.subscribe((params) => {
            let par = params as Detail;
            this.waterSourceId = par.reservoirId;
            this.type = {
                id: par.reservoirId,
                type: WaterMeterType.WATERSOURCE,
            };
        });
    }

    public ngOnInit(): void {
        this.cleanRefreshWaterMeter();

        // Get waterMeter to this ReservoirID
        if (!this.waterSourceId) {
            return;
        }

        this.loadReservoir(this.waterSourceId);
        this.loadWaterMeter(this.waterSourceId);
    }

    public goToEditGeolocation() {
        if (!this.waterSource) {
            return;
        }

        this.showMap = false;

        const geolocation = this.waterSource.geolocation;

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: geolocation,
            configureMap: {
                id: this.mapId,
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: this.mapType,
                },
                zoom: geolocation.zoom,
                showMarker: true,
                height: '300px',
                dragging: false,
                selectOptionFilter: true,
            },
        };

        const dialogRef = this.dialog.open(DialogComponent, {
            width: '100%',
            data,
        });

        dialogRef.componentInstance.submitClicked.subscribe((result: Geolocation | undefined) => {
            if (result) {
                this.updateGeolocation(result);
            } else {
                this.showMap = true;
            }
        });
    }

    public seeMap() {
        if (!this.waterSource) {
            return;
        }

        this.showMap = true;

        const geolocation = this.waterSource.geolocation;

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: geolocation,
            configureMap: {
                id: 'detail_map_dialog',
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: this.mapType,
                },
                zoom: geolocation.zoom,
                showMarker: true,
                height: '500px',
                dragging: false,
                selectOptionFilter: true,
            },
        };

        this.dialog.open(DialogOnlyMapComponent, {
            width: '100%',
            data,
        });
    }

    public updateGeolocation(result: Geolocation) {
        if (!this.waterSource) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            next: (response) => {
                this.waterSource!.geolocation = response;
                this.configureMaps(response);
                this.svcCacheWaterSource.clean();
                this.showMap = true;
            },
            error: (error) => this.svcNotification.warning({ message: error.error }),
        });
    }

    public goToNewReservoir() {
        this.router.navigate(['manager/reservoirs/create']);
    }
    // Clean and refresh water Meter
    private cleanRefreshWaterMeter() {
        this.svcPersistant.clear();
        // Persistant to send waterMeterID
        this.svcPersistant.get().subscribe((res) => {
            this.waterMeter = res;
            this.waterMeterId = res?.id!;
        });
    }
    // Load reservoir in own method
    private loadReservoir(waterSourceId: number) {
        this.svcWaterSource.getReservoir(waterSourceId).subscribe({
            next: (reservoir) => {
                this.waterSource = reservoir;
                let geolocation = this.waterSource.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
        });
    }
    // Load water meter in own method
    private loadWaterMeter(waterSourceId: number) {
        // first persist the current water meter and then subscribe to keep updated
        this.svcWaterSource.getCurrentReservoirWaterMeter(waterSourceId).subscribe((response) => {
            this.waterMeter = response;
            this.waterMeterId = response.id;
            // override the current water meter into resistant service
            this.svcPersistant.emit(response);
        });
    }

    private configureMaps(geolocation: Geolocation) {
        this.configureMap = {
            id: 'detail_map',
            center: {
                lat: geolocation.latitude,
                lon: geolocation.longitude,
                type: this.mapType,
            },
            zoom: geolocation.zoom,
            showMarker: true,
            height: this.mapHeight,
            dragging: false,
        };
        this.configureView = {
            latitude: +geolocation.latitude,
            longitude: +geolocation.longitude,
            zoom: this.mapZoomDefault,
            horizontalDegree: this.mapStreetViewPositionDegree,
            verticalDegree: this.mapStreetViewPositionDegree,
            height: this.mapHeight,
        };
    }
}
