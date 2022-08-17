import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation, GeolocationService, ReservoirCreate, ReservoirService, WaterMeter } from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { DialogOnlyMapComponent } from 'src/app/components/dialog-only-map/dialog-only-map.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
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
    public reservoirId: number | undefined;
    public reservoir: ReservoirCreate | undefined;

    // map
    public canLoadStreetView: boolean = false;
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;

    // map config
    public mode: string = 'map';
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '500px';

    public waterMeter: WaterMeter | undefined;

    public type: Type | undefined = undefined;

    public loading: boolean = false;

    public showMap: boolean = true;
    private mapId: string = 'detail_map';

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private svcReservoir: ReservoirService,
        private svcReservoirCache: ReservoirCacheService,
        private svcPersistantWaterMeter: WaterMeterPersistantService,
        public dialog: MatDialog,
        private svcGeolocation: GeolocationService,
        private svcNotification: NotificationService,
        private googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.canLoadStreetView = isStreetViewAvailable();

        this.loading = true;
        this.reservoir = undefined;
        this.activatedRoute.queryParams.subscribe((params) => {
            let par = params as Detail;
            this.reservoirId = par.reservoirId;
            this.type = {
                id: par.reservoirId,
                type: WaterMeterType.RESERVOIR,
            };
        });
        this.googleAnalyticsService.pageView('view_reservoir', '/detail_reservoir');
    }

    public ngOnInit(): void {
        if (!this.reservoirId) {
            return;
        }

        // first, get the reservoir
        this.loadReservoir(this.reservoirId);

        // second, get the water meter
        this.loadWaterMeter(this.reservoirId);
    }

    public goToEditGeolocation() {
        if (!this.reservoir) {
            return;
        }

        this.showMap = false;

        const geolocation = this.reservoir.geolocation;

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: geolocation,
            configureMap: {
                id: this.mapId,
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                },
                zoom: geolocation.zoom,
                showCircle: true,
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
        if (!this.reservoir) {
            return;
        }

        this.showMap = true;

        const geolocation = this.reservoir.geolocation;

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: geolocation,
            configureMap: {
                id: 'detail_map_dialog',
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                },
                zoom: geolocation.zoom,
                showCircle: true,
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
        if (!this.reservoir) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            next: (response) => {
                this.reservoir!.geolocation = response;
                this.configureMaps(response);
                this.svcReservoirCache.clean();
                this.showMap = true;
            },
            error: (error) => this.svcNotification.warning({ message: error.error }),
        });
    }

    public goToNewReservoir() {
        this.router.navigate(['manager/reservoirs/create']);
    }

    private loadReservoir(reservoirId: number) {
        this.svcReservoir.getReservoir(reservoirId).subscribe({
            next: (reservoir) => {
                this.reservoir = reservoir;
                let geolocation = this.reservoir.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
        });
    }

    private loadWaterMeter(reservoirId: number) {
        // first persist the current water meter and then subscribe to keep updated
        this.svcReservoir.getCurrentReservoirWaterMeter(reservoirId).subscribe({
            next: (response) => {
                this.waterMeter = response;
                // override the current water meter into resistant service
                this.svcPersistantWaterMeter.emit(response);
                // subscribe to service to keep the code updated to changes
                this.svcPersistantWaterMeter.get().subscribe((response) => {
                    this.waterMeter = response;
                });
            },
            error: () => this.svcPersistantWaterMeter.clear(),
        });
    }

    private configureMaps(geolocation: Geolocation) {
        this.configureMap = {
            id: 'detail_map',
            center: {
                lat: geolocation.latitude,
                lon: geolocation.longitude,
            },
            zoom: geolocation.zoom,
            showCircle: true,
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
