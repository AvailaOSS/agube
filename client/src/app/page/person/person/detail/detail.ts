import { ActivatedRoute, Router } from '@angular/router';
import {
    DwellingService,
    Geolocation,
    Owner,
    Resident,
    UserDwellingDetail,
    UserPhone,
    UserService,
} from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { ConfigureMap, MapIconType } from 'src/app/components/map/map/configure-map';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { IDetail } from '../manage/detail';

export class Detail {
    public personId: number | undefined;
    public person: Resident | Owner | undefined;
    public phones: UserPhone[];
    public dwellings: UserDwellingDetail[];
    public dwellingPath: string = '';

    public profilePhoto: any;

    // map
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;

    // map config
    public mode: string = 'map';
    private mapId = 'detail_map';
    private mapZoomDefault = 15;
    private mapStreetViewPositionDegree = 0;
    private mapHeight: string = '500px';

    constructor(
        protected router: Router,
        protected activatedRoute: ActivatedRoute,
        protected svcDwelling: DwellingService,
        protected svcUser: UserService,
        protected svcNotification: NotificationService,
        protected googleAnalyticsService: GoogleAnalyticsService
    ) {
        this.person = undefined;
        this.phones = [];
        this.dwellings = [];
        this.dwellingPath = '/manager/home/manager/client/dwellings/detail';
        this.activatedRoute.params.subscribe((params) => {
            const par = params as IDetail;
            this.personId = par.personId;
        });
        this.googleAnalyticsService.event('event', 'view_person');
    }

    protected getUserPhoto(userId: number) {
        this.svcUser.getUserPhoto(userId).subscribe({
            next: (response) => {
                if (!response) {
                    return;
                }
                const reader = new FileReader();
                reader.addEventListener('load', () => (this.profilePhoto = reader.result), false);
                reader.readAsDataURL(response);
            },
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
            error: (error) =>
                this.svcNotification.warning({
                    message: error.error,
                }),
            next: (response) => {
                if (!response.length) {
                    return;
                }
                this.dwellings = response;
            },
        });
    }

    private configureMaps(geolocation: Geolocation) {
        this.configureMap = {
            center: {
                lat: geolocation.latitude,
                lon: geolocation.longitude,
                type: MapIconType.HOUSE,
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
