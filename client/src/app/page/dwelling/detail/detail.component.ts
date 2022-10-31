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

    // map config
    public mode: string = 'map';
    private readonly mapType: MapIconType = MapIconType.HOUSE;
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '380px';
    private mapId: string = 'detail_map';
    public waterMeterId: number | undefined;

    public type: Type | undefined = undefined;

    public showMap: boolean = true;

    public loading: boolean = false;
    public configCommentComponent: CommentConfig | undefined;

    public canLoad: boolean = false;

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
            let par = params as Detail;
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
            edit: true,
            create: false,
        };

        this.dialog.open(DialogOnlyMapComponent, {
            width: '100%',
            data,
        });
    }

    public seeComments() {
        this.dialog.open(ListComponent, {
            hasBackdrop: true,
            panelClass: ['custom-dialog-container'],
            data: this.configCommentComponent,
        });
    }

    public goToEditGeolocation() {
        if (!this.dwelling) {
            return;
        }

        this.showMap = false;

        const geolocation = this.dwelling.geolocation;

        let data: DialogParameters = {
            dialogTitle: 'PAGE.CONFIG.CLIENT.CONTACT-INFO.ADDRESS.EDIT-DIALOG.TITLE',
            geolocation: geolocation,
            configureMap: {
                id: 'edit_address_map',
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
            edit: true,
            create: false,
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

    public updateGeolocation(result: Geolocation) {
        if (!this.dwelling) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            next: (response) => {
                this.dwelling!.geolocation = response;
                this.configureMaps(response);
                this.svcCacheDwelling.clean();
                this.showMap = true;
                this.googleAnalyticsService.gtag('event', 'update_address', {
                    city: response.address.city,
                    street: response.address?.road,
                    latitude: response.latitude,
                    longitude: response.longitude,
                    zoom: response.zoom,
                    horizontal_degree: response?.horizontal_degree,
                    vertical_degree: response?.vertical_degree,
                    number: response?.number,
                    flat: response?.flat,
                    gate: response?.gate,
                });
            },
            error: (error) => {
                this.svcNotification.warning({ message: error.error });
                this.googleAnalyticsService.exception('error_address_update', true);
            },
        });
    }
    // call function to joyride
    public tour() {
        let steps: string[] = [
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
            next: (dwelling) => {
                this.dwelling = dwelling;
                let geolocation = this.dwelling.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
            error: (error) => (this.loading = false),
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
            id: this.mapId,
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
