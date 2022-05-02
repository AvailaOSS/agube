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
} from '@availa/agube-rest-api';
@Component({
  selector: 'app-reservoir',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public userId: number | undefined;
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private svcReservoir: ReservoirService,
    private svcManager: ManagerService,
    private svcPersistant: WaterMeterPersistantService
  ) {
    this.svcManager.userIsManager().subscribe((response) => {
      this.canLoad = response.is_manager;
      console.log(response);
    });
    this.loading = true;
    this.reservoir = undefined;
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      let par = params as Detail;
      this.reservoirId = par.reservoirId;
      this.type = {
        id: par.reservoirId,
        type: WaterMeterType.RESERVOIR,
      };
    });
  }

  ngOnInit(): void {
    console.log(this.reservoirId);
    if (!this.reservoirId) {
      return;
    }

    this.svcReservoir.getReservoir(this.reservoirId).subscribe({
      next: (reservoir) => {
        console.log(reservoir);
        this.reservoir = reservoir;
        let geolocation = this.reservoir.address.geolocation;
        this.configureMaps(geolocation);
        this.loading = false;
      },
      error: (error) => (this.loading = false),
    });

    this.svcReservoir
      .getCurrentReservoirWaterMeter(this.reservoirId)
      .subscribe((response) => {
        this.waterMeterId = response.id;
        this.svcPersistant.emitCode(response.code);
      });
  }

  public goToNewDwelling() {
    this.router.navigate(['manager/reservoirs/create']);
  }

  private configureMaps(geolocation: Geolocation) {
    this.configureMap = {
      lat: geolocation.latitude,
      lon: geolocation.longitude,
      zoom: geolocation.zoom,
      showCircle: true,
      height: this.mapHeight,
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
