import { JoyRideFunction } from 'src/app/utils/joyride/joyride';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
    DwellingCreate,
    DwellingService,
    Geolocation,
    GeolocationService,
    ManagerService,
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
import { DwellingCacheService } from 'src/app/utils/cache/dwelling-cache.service';
import { isStreetViewAvailable } from 'src/app/utils/cache/streetview-status';
import { Type } from '../../water-meter/detail/type';
import { WaterMeterPersistantService } from '../../water-meter/water-meter-persistant.service';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';
import { Detail } from './detail';

@Component({
    selector: 'app-page-dwelling-detail',
    styleUrls: ['./detail.component.scss'],
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
    public dwellingId: number | undefined;
    public dwelling: DwellingCreate | undefined;

    // map
    public canLoadStreetView: boolean = false;
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;
    public type: Type | undefined = undefined;
    public showMap: boolean = true;
    public loading: boolean = false;
    public configCommentComponent: CommentConfig | undefined;
    public canLoad: boolean = false;

    // map config
    public mode: string = 'map';
    public waterMeterId: number | undefined;
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '380px';
    private mapId: string = 'detail_map';
    private readonly mapType: MapIconType = MapIconType.HOUSE;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private svcDwelling: DwellingService,
        private svcCacheDwelling: DwellingCacheService,
        private svcManager: ManagerService,
        private svcPersistant: WaterMeterPersistantService,
        private svcGeolocation: GeolocationService,
        private svcNotification: NotificationService,
        public dialog: MatDialog,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svcTranslate: TranslateService,
        private readonly joyrideService: JoyrideService
    ) {
        this.canLoadStreetView = isStreetViewAvailable();
        this.googleAnalyticsService.pageView('view_dwelling', '/detail_dwelling');
        this.svcManager.userIsManager().subscribe({
            next: (response) => (this.canLoad = response.is_manager),
        });
        this.loading = true;
        this.dwelling = undefined;
        this.activatedRoute.queryParams.subscribe((params) => {
            const par = params as Detail;
            this.dwellingId = par.dwellingId;
            this.configCommentComponent = {
                id: this.dwellingId!,
                type: CommentType.DWELLING,
            };
            this.type = {
                id: par.dwellingId,
                type: WaterMeterType.DWELLING,
            };
        });
    }

    public ngOnInit(): void {
        this.cleanRefreshWaterMeter();
        if (!this.dwellingId) {
            return;
        }

        this.loadDwelling(this.dwellingId);
        this.loadWaterMeter(this.dwellingId);
    }

    public goToNewDwelling() {
        this.router.navigate(['manager/dwellings/create']);
    }

    public seeMap() {
        if (!this.dwelling) {
            return;
        }

        this.showMap = true;

        const geolocation = this.dwelling.geolocation;

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
        if (!this.dwelling) {
            return;
        }

        this.showMap = false;

        const geolocation = this.dwelling.geolocation;

        const data: DialogParameters = {
            configureMap: {
                center: {
                    lat: geolocation.latitude,
                    lon: geolocation.longitude,
                    type: this.mapType,
                },
                dragging: false,
                height: '300px',
                id: 'edit_address_map',
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
        if (!this.dwelling) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            error: (error) => {
                this.svcNotification.warning({ message: error.error });
                this.googleAnalyticsService.exception('error_address_update', true);
            },
            next: (response) => {
                this.dwelling!.geolocation = response;
                this.configureMaps(response);
                this.svcCacheDwelling.clean();
                this.showMap = true;
                this.googleAnalyticsService.gtag('event', 'update_address', {
                    city: response.address.city,
                    flat: response?.flat,
                    gate: response?.gate,
                    horizontal_degree: response?.horizontal_degree,
                    latitude: response.latitude,
                    longitude: response.longitude,
                    number: response?.number,
                    street: response.address?.road,
                    vertical_degree: response?.vertical_degree,
                    zoom: response.zoom,
                });
            },
        });
    }
    // call function to joyride
    public tour() {
        const steps: string[] = [
            'DwellingInfoStep',
            'DwellingWaterMaterStep',
            'DwellingWaterMaterMeasurementStep',
            'DwellingMapDetailStep',
        ];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    // Clean and refresh water Meter
    private cleanRefreshWaterMeter() {
        this.svcPersistant.clear();
        // Persistant to send waterMeterID
        this.svcPersistant.get().subscribe((res) => {
            this.waterMeterId = res?.id!;
        });
    }
    // Load dwelling in own method
    private loadDwelling(dwellingId: number) {
        this.svcDwelling.getDwelling(dwellingId).subscribe({
            error: (error) => (this.loading = false),
            next: (dwelling) => {
                this.dwelling = dwelling;
                const geolocation = this.dwelling.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
        });
    }
    // Load water meter in own method
    private loadWaterMeter(dwellingId: number) {
        // first persist the current water meter and then subscribe to keep updated
        this.svcDwelling.getCurrentDwellingWaterMeter(dwellingId).subscribe((response) => {
            this.waterMeterId = response.id;
            // override the current water meter into resistant service
            this.svcPersistant.emit(response);
        });
    }
    // Configure Map to show in dwelling detail
    private configureMaps(geolocation: Geolocation) {
        this.configureMap = {
            center: {
                lat: geolocation.latitude,
                lon: geolocation.longitude,
                type: this.mapType,
            },
            dragging: false,
            height: this.mapHeight,
            id: this.mapId,
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
