import { Geolocation, ManagerService, ResidentService } from '@availa/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { ConfigureMap } from '../../../components/map/map/configure-map';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from '../../water-meter/detail/type';
import { WaterMeterPersistantService } from '../../water-meter/water-meter-persistant.service';

@Component({
    selector: 'app-page-dwelling-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
    public resident: any | undefined;

    // map
    public configureView: ConfigureView | undefined;
    public configureMap: ConfigureMap | undefined;
    // map config
    public mode: string = 'map';
    private mapZoomDefault: number = 15;
    private mapStreetViewPositionDegree: number = 0;
    private mapHeight: string = '800px';

    public waterMeterId: number | undefined;

    public type: Type | undefined = undefined;

    public loading: boolean = false;

    public canLoad: boolean = false;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private svcManager: ManagerService) {
        this.svcManager.userIsManager().subscribe((response) => (this.canLoad = response.is_manager));
        this.loading = true;

        this.activatedRoute.queryParamMap.subscribe((params: any) => {
            this.resident = JSON.parse(params.params.resident);
            this.configureMaps(this.resident.data.user.geolocation[0]);
        });
    }

    ngOnInit(): void {}

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
            dragging: false
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
