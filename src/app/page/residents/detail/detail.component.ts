import {
    Geolocation,
    Resident,
    ResidentService,
    DwellingService,
    UserService,
    UserDwellingDetail,
} from '@availa/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { ConfigureMap } from '../../../components/map/map/configure-map';
import { Router, ActivatedRoute } from '@angular/router';
import { Detail } from './detail';

@Component({
    selector: 'app-page-dwelling-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    public residentId: number | undefined;
    public resident: Resident | undefined;
    public dwellings: UserDwellingDetail[];

    // map
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;
    // map config
    public mode: string = 'map';
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '500px';

    public loading: boolean = false;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private svcResident: ResidentService,
        private svcDwelling: DwellingService,
        private svcUser: UserService
    ) {
        this.loading = true;
        this.resident = undefined;
        this.dwellings = [];
        this.activatedRoute.queryParams.subscribe((params) => {
            let par = params as Detail;
            this.residentId = par.residentId;
        });
    }

    ngOnInit(): void {
        if (!this.residentId) {
            return;
        }

        this.svcResident.getResident(this.residentId).subscribe({
            next: (resident) => {
                this.resident = resident;

                this.svcDwelling
                    .getDwelling(resident.dwelling_id!)
                    .subscribe((dwelling) => this.configureMaps(dwelling.geolocation));

                this.svcUser.getDwellingDetail(resident.user.id!).subscribe({
                    next: (response) => {
                        if (!response.length) {
                            this.loading = false;
                            return;
                        }
                        this.dwellings = response;
                    },
                    error: (error) => (this.loading = false),
                });

                this.loading = false;
            },
            error: (error) => (this.loading = false),
        });
    }

    public goToNewDwelling() {
        this.router.navigate(['manager/dwellings/create']);
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
