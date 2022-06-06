import { DialogParameters } from 'src/app/components/dialog/dialog-parameter';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { WaterMeterPersistantService } from '../../water-meter/water-meter-persistant.service';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';
import { Detail } from './detail';
import { Type } from '../../water-meter/detail/type';
import {
    ReservoirService,
    Geolocation,
    ManagerService,
    ReservoirCreate,
    GeolocationService,
} from '@availa/agube-rest-api';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '@availa/notification';

@Component({
    selector: 'app-reservoir',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    public reservoirId: number | undefined;
    public reservoir: ReservoirCreate | undefined;

    // map
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;
    // map config
    public mode: string = 'map';
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '500px';

    public waterMeterId: number | undefined;

    public type: Type | undefined = undefined;

    public loading: boolean = false;

    public canLoad: boolean = false;

    public showMap: boolean = true;
    private mapId: string = 'detail_map';
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private svcReservoir: ReservoirService,
        private svcManager: ManagerService,
        private svcPersistant: WaterMeterPersistantService,
        public dialog: MatDialog,
        private svcGeolocation: GeolocationService,
        private svcNotification: NotificationService
    ) {
        this.svcManager.userIsManager().subscribe((response) => {
            this.canLoad = response.is_manager;
        });
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

    public updateGeolocation(result: Geolocation) {
        if (!this.reservoir) {
            return;
        }

        this.svcGeolocation.updateGeolocation(result.id!, result).subscribe({
            next: (response) => {
                this.reservoir!.geolocation = response;
                this.configureMaps(response);
                this.showMap = true;
            },
            error: (error) => this.svcNotification.warning({ message: error.error }),
        });
    }

    ngOnInit(): void {
        if (!this.reservoirId) {
            return;
        }

        this.svcReservoir.getReservoir(this.reservoirId).subscribe({
            next: (reservoir) => {
                this.reservoir = reservoir;
                let geolocation = this.reservoir.geolocation;
                this.configureMaps(geolocation);
                this.loading = false;
            },
            error: (error) => (this.loading = false),
        });

        this.svcReservoir.getCurrentReservoirWaterMeter(this.reservoirId).subscribe((response) => {
            this.waterMeterId = response.id;
            this.svcPersistant.emit(response);
        });
    }

    public goToNewReservoir() {
        this.router.navigate(['manager/reservoirs/create']);
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
