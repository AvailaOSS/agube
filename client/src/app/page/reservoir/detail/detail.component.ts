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
} from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { JoyrideService } from 'ngx-joyride';
import { ListComponent } from 'src/app/components/comment/list/list.component';
import { CommentConfig, CommentType } from 'src/app/components/comment/type';
import { DialogOnlyMapComponent } from 'src/app/components/dialog-only-map/dialog-only-map.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { ReservoirCacheService } from 'src/app/utils/cache/reservoir-cache.service';
import { isStreetViewAvailable } from 'src/app/utils/cache/streetview-status';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { Type } from '../../water-meter/detail/type';
import { WaterMeterPersistantService } from '../../water-meter/water-meter-persistant.service';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';
import { Detail } from './detail';

@Component({
    selector: 'app-reservoir',
    styleUrls: ['./detail.component.scss'],
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
    public canLoad = true;
    public configCommentComponent: CommentConfig | undefined;

    // map
    public canLoadStreetView = false;
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;

    public reservoirId: number | undefined;
    public reservoir: ReservoirCreate | undefined;

    public showMap = true;
    public type: Type | undefined = undefined;
    public loading = false;

    // map config
    public mode: string = 'map';
    private readonly mapType: MapIconType = MapIconType.RESERVOIR;
    private mapZoomDefault = 15;
    private mapStreetViewPositionDegree = 0;
    private mapHeight: string = '500px';
    private mapId: string = 'detail_map';
    public waterMeterId: number | undefined;
    public waterMeter: WaterMeter | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        public dialog: MatDialog,
        private googleAnalyticsService: GoogleAnalyticsService,
        private readonly joyrideService: JoyrideService,
        private router: Router,
        private svcCacheReservoir: ReservoirCacheService,
        private svcGeolocation: GeolocationService,
        private svcManager: ManagerService,
        private svcNotification: NotificationService,
        private svcPersistant: WaterMeterPersistantService,
        private svcReservoir: ReservoirService,
        private svcTranslate: TranslateService,
    ) {
        this.canLoadStreetView = isStreetViewAvailable();
        this.googleAnalyticsService.pageView('view_reservoir', '/detail_reservoir');
        this.svcManager.userIsManager().subscribe({
            next: (response) => (this.canLoad = response.is_manager),
        });
        this.loading = true;
        this.reservoir = undefined;
        this.activatedRoute.queryParams.subscribe((params) => {
            const par = params as Detail;
            this.reservoirId = par.reservoirId;
            this.configCommentComponent = {
                id: this.reservoirId!,
                type: CommentType.RESERVOIR,
            };
            this.type = {
                id: par.reservoirId,
                type: WaterMeterType.RESERVOIR,
            };
        });
    }

    public ngOnInit(): void {
        this.cleanRefreshWaterMeter();

        // Get waterMeter to this ReservoirID
        if (!this.reservoirId) {
            return;
        }

        this.loadReservoir(this.reservoirId);
        this.loadWaterMeter(this.reservoirId);
    }

    public goToNewReservoir() {
        this.router.navigate(['manager/reservoirs/create']);
    }

    public seeMap() {
        if (!this.reservoir) {
            return;
        }

        this.showMap = true;

        const geolocation = this.reservoir.geolocation;

        const data: DialogParameters = {
            configureMap: {
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: this.mapType,
                },
                dragging: false,
                height: '500px',
                id: 'detail_map_dialog',
                selectOptionFilter: true,
                showMarker: true,
                zoom: geolocation.zoom,
            },
            create: false,
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            edit: true,
            geolocation: geolocation,
        };

        this.dialog.open(DialogOnlyMapComponent, {
            data,
            width: '100%',
        });
    }

    public seeComments() {
        this.dialog.open(ListComponent, {
            data: this.configCommentComponent,
            hasBackdrop: true,
            panelClass: ['custom-dialog-container'],
        });
    }

    public goToEditGeolocation() {
        if (!this.reservoir) {
            return;
        }

        this.showMap = false;

        const geolocation = this.reservoir.geolocation;

        let data: DialogParameters = {
            configureMap: {
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: this.mapType,
                },
                dragging: false,
                height: '300px',
                id: this.mapId,
                selectOptionFilter: true,
                showMarker: true,
                zoom: geolocation.zoom,
            },
            create: false,
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            edit: true,
            geolocation: geolocation,
        };

        const dialogRef = this.dialog.open(DialogComponent, {
            data,
            width: '100%',
        });

        dialogRef.componentInstance.submitClicked.subscribe((result: Geolocation | undefined) => {
            if (result) {
                this.updateGeolocation(result);
            } else {
                this.showMap = true;
            }
        });
    }

    public updateGeolocation(result: Geolocation) {
        if (!this.reservoir) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            error: (error) => this.svcNotification.warning({ message: error.error }),
            next: (response) => {
                this.reservoir!.geolocation = response;
                this.configureMaps(response);
                this.svcCacheReservoir.clean();
                this.showMap = true;
            },
        });
    }

    // call function to joyride
    public tour() {
        const steps: string[] = [
            'ReservoirInfoStep',
            'ReservoirWaterMaterStep',
            'ReservoirWaterMaterMeasurementStep',
            'ReservoirMapDetailStep',
        ];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    // Clean and refresh water Meter
    private cleanRefreshWaterMeter() {
        this.svcPersistant.clear();
        // Persistant to send waterMeterID
        this.svcPersistant.get().subscribe((res) => {
            this.waterMeter = res;
            this.waterMeterId = res?.id;
        });
    }

    // Load reservoir in own method
    private loadReservoir(reservoirId: number): void {
        this.svcReservoir.getReservoir(reservoirId).subscribe({
            next: (reservoir) => {
                this.reservoir = reservoir;
                const geolocation = this.reservoir.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
        });
    }
    // Load water meter in own method
    private loadWaterMeter(reservoirId: number) {
        // first persist the current water meter and then subscribe to keep updated
        this.svcReservoir.getCurrentReservoirWaterMeter(reservoirId).subscribe((response) => {
            this.waterMeter = response;
            this.waterMeterId = response.id;
            // override the current water meter into resistant service
            this.svcPersistant.emit(response);
        });
    }

    private configureMaps(geolocation: Geolocation) {
        this.configureMap = {
            center: {
                lat: geolocation.latitude,
                lon: geolocation.longitude,
                type: this.mapType,
            },
            dragging: false,
            height: this.mapHeight,
            id: 'detail_map',
            showMarker: true,
            zoom: geolocation.zoom,
        };
        this.configureView = {
            height: this.mapHeight,
            horizontalDegree: this.mapStreetViewPositionDegree,
            latitude: +geolocation.latitude,
            longitude: +geolocation.longitude,
            verticalDegree: this.mapStreetViewPositionDegree,
            zoom: this.mapZoomDefault,
        };
    }
}
