import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
    Geolocation,
    GeolocationService,
    ManagerService,
    SpringSource,
    SpringSourceService,
    WaterMeter,
} from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ListComponent } from 'src/app/components/comment/list/list.component';
import { CommentConfig, CommentType } from 'src/app/components/comment/type';
import { DialogOnlyMapComponent } from 'src/app/components/dialog-only-map/dialog-only-map.component';
import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { isStreetViewAvailable } from 'src/app/utils/cache/streetview-status';
import { Type } from '../../water-meter/detail/type';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';
import { Detail } from './detail';
import { SpringSourceCacheService } from 'src/app/utils/cache/spring-source-cache.service';
import { TranslateService } from '@ngx-translate/core';
import { JoyrideService } from 'ngx-joyride';
import { JoyRideFunction } from 'src/app/utils/joyride/joyride';

@Component({
    selector: 'app-spring-source',
    styleUrls: ['./detail.component.scss'],
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
    // variables
    public springSourceId: number | undefined;
    public springSource: SpringSource | undefined;

    // map
    public canLoadStreetView: boolean = false;
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;

    // map config
    public mode: string = 'map';
    private readonly mapType: MapIconType = MapIconType.SPRING_SOURCE;
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '500px';
    private mapId: string = 'detail_map';
    public waterMeterId: number | undefined;
    public waterMeter: WaterMeter | undefined;

    public type: Type | undefined = undefined;

    public showMap: boolean = true;
    public loading: boolean = false;
    public canLoad: boolean = false;
    public configCommentComponent: CommentConfig | undefined;

    constructor(
        private activatedRoute: ActivatedRoute,
        private svcSpringSourceCache: SpringSourceCacheService,
        private svcSpringSource: SpringSourceService,
        private svcManager: ManagerService,
        public dialog: MatDialog,
        private svcGeolocation: GeolocationService,
        private svcNotification: NotificationService,
        private googleAnalyticsService: GoogleAnalyticsService,
        private svcTranslate: TranslateService,
        private readonly joyrideService: JoyrideService
    ) {
        this.canLoadStreetView = isStreetViewAvailable();
        this.googleAnalyticsService.pageView('view_water_source', '/detail_water_source');
        this.svcManager.userIsManager().subscribe({
            next: (response) => (this.canLoad = response.is_manager),
        });
        this.loading = true;
        this.springSource = undefined;
        this.activatedRoute.queryParams.subscribe((params) => {
            let par = params as Detail;
            this.springSourceId = par.springSourceId;
            this.configCommentComponent = {
                id: this.springSourceId!,
                type: CommentType.SPRING_SOURCE,
            };
            this.type = {
                id: par.springSourceId,
                type: WaterMeterType.SPRINGSOURCE,
            };
        });
    }

    // initialize load spring Source
    public ngOnInit(): void {
        if (!this.springSourceId) {
            return;
        }
        this.loadSpringSource(this.springSourceId);
    }

    // Comments in dialog
    public seeComments() {
        this.dialog.open(ListComponent, {
            data: this.configCommentComponent,
            hasBackdrop: true,
            panelClass: ['custom-dialog-container'],
        });
    }

    // Edit geolocation with dialog
    public goToEditGeolocation() {
        if (!this.springSource) {
            return;
        }
        this.showMap = false;
        const geolocation = this.springSource.geolocation;

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

    // dialog map to see map in little screen
    public seeMap() {
        if (!this.springSource) {
            return;
        }

        this.showMap = true;
        const geolocation = this.springSource.geolocation;
        let data: DialogParameters = {
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

    // update geolocation function
    public updateGeolocation(result: Geolocation) {
        if (!this.springSource) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            error: (error) => this.svcNotification.warning({ message: error.error }),
            next: (response) => {
                this.springSource!.geolocation = response;
                this.svcSpringSourceCache.clean();
                this.configureMaps(response);
                this.showMap = true;
            },
        });
    }
    // call function to joyride
    public tour() {
        const steps: string[] = [
            'SpringSourceInfoStep',
            'SpringSourceWaterMaterStep',
            'SpringSourceWaterMaterMeasurementStep',
            'SpringSourceMapDetailStep',
        ];
        JoyRideFunction(this.joyrideService, this.svcTranslate, steps);
    }

    // Load spring-source in own method
    private loadSpringSource(springSourceId: number) {
        this.svcSpringSource.getSpringSource(springSourceId).subscribe({
            next: (springSource) => {
                this.springSource = springSource;
                let geolocation = this.springSource.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
        });
    }

    // Configure Map
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
