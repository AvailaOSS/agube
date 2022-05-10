import {
  DwellingService,
  DwellingCreate,
  Geolocation,
  ManagerService,
} from '@availa/agube-rest-api';
import { Component, OnInit } from '@angular/core';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { ConfigureMap } from '../../../components/map/map/configure-map';
import { Router, ActivatedRoute } from '@angular/router';
import { Type } from '../../water-meter/detail/type';
import { WaterMeterType } from '../../water-meter/water-meter-type.enum';
import { WaterMeterPersistantService } from '../../water-meter/water-meter-persistant.service';
import { Detail } from './detail';

@Component({
  selector: 'app-page-dwelling-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public dwellingId: number | undefined;
  public dwelling: DwellingCreate | undefined;

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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private svcDwelling: DwellingService,
    private svcManager: ManagerService,
    private svcPersistant: WaterMeterPersistantService
  ) {
    this.svcManager
      .userIsManager()
      .subscribe((response) => (this.canLoad = response.is_manager));
    this.loading = true;
    this.dwelling = undefined;
    this.activatedRoute.queryParams.subscribe((params) => {
      let par = params as Detail;
      this.dwellingId = par.dwellingId;
      this.type = {
        id: par.dwellingId,
        type: WaterMeterType.DWELLING,
      };
    });
  }

  ngOnInit(): void {
    if (!this.dwellingId) {
      return;
    }
    this.svcDwelling.getDwelling(this.dwellingId).subscribe({
      next: (dwelling) => {
        this.dwelling = dwelling;
        let geolocation = this.dwelling.geolocation;
        this.configureMaps(geolocation);
        this.loading = false;
      },
      error: (error) => (this.loading = false),
    });

    this.svcDwelling
      .getCurrentDwellingWaterMeter(this.dwellingId)
      .subscribe((response) => {
        this.waterMeterId = response.id;
        this.svcPersistant.emit(response);
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
