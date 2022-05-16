import { ActivatedRoute, Router } from '@angular/router';
import {
    DwellingService,
    Geolocation,
    Owner,
    Resident,
    UserDwellingDetail,
    UserPhone,
    UserService,
} from '@availa/agube-rest-api';
import { NotificationService } from '@availa/notification';
import { ConfigureMap } from 'src/app/components/map/map/configure-map';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { IDetail } from '../manage/detail';

export class Detail {
    public personId: number | undefined;
    public person: Resident | Owner | undefined;
    public phones: UserPhone[];
    public dwellings: UserDwellingDetail[];
    public dwellingPath: string = '';

    // map
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;

    // map config
    public mode: string = 'map';
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '500px';

    constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected svcDwelling: DwellingService,
        protected svcUser: UserService,
        protected svcNotification: NotificationService
    ) {
        this.person = undefined;
        this.phones = [];
        this.dwellings = [];
        this.dwellingPath = '/manager/home/manager/client/dwellings/detail';
        this.activatedRoute.params.subscribe((params) => {
            let par = params as IDetail;
            this.personId = par.personId;
        });
    }

    protected getDwellingAndConfigureMap() {
        if (!this.person) {
            return;
        }

        this.svcDwelling
            .getDwelling(this.person.dwelling_id!)
            .subscribe((dwelling) => this.configureMaps(dwelling.geolocation));
    }

    protected getDwellingDetails() {
        if (!this.person) {
            return;
        }

        this.svcUser.getDwellingDetail(this.person.user.id!).subscribe({
            next: (response) => {
                if (!response.length) {
                    return;
                }
                this.dwellings = response;
            },
            error: (error) =>
                this.svcNotification.warning({
                    message: error.error,
                }),
        });
    }

    private configureMaps(geolocation: Geolocation) {
        this.configureMap = {
            lat: geolocation.latitude,
            lon: geolocation.longitude,
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
