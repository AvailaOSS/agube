import {
  UserService,
  DwellingService,
  DwellingCreate,
  Geolocation,
} from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { Component, OnInit } from '@angular/core';
import { ConfigureView } from 'src/app/components/map/view/map-location';
import { ConfigureMap } from '../../../components/map/map/configure-map';
import { Router } from '@angular/router';
import { GoogleChartConfigure } from '../../../components/map/chart/google-chart-configure';
@Component({
  selector: 'app-page-dwelling-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public userId: number | undefined;
  public dwelling: DwellingCreate | undefined;

  // map
  public configureView: ConfigureView | undefined;
  public configureMap: ConfigureMap | undefined;
  // map config
  public mode: string = 'map';
  private mapZoomDefault: number = 15;
  private mapStreetViewPositionDegree: number = 0;
  private mapHeight: string = '500px';

  public chartGoogleConsume: GoogleChartConfigure = {
    id: 'chart_div_1',
    options: {
      width: 500,
      height: 200,
      redFrom: 80,
      redTo: 100,
      yellowFrom: 50,
      yellowTo: 80,
      minorTicks: 10,
    },
  };
  public chartGoogleConsume2: GoogleChartConfigure = {
    id: 'chart_div_2',
    options: {
      width: 500,
      height: 200,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 70,
      yellowTo: 90,
      minorTicks: 10,
    },
  };
  constructor(
    private router: Router,
    private svcAccount: AccountService,
    private svcUser: UserService,
    private svcDwelling: DwellingService
  ) {
    this.dwelling = undefined;
  }

  ngOnInit(): void {
    this.svcAccount.getUser().subscribe((user) => {
      this.userId = user?.user_id;
      this.svcUser
        .getDwellingDetail(this.userId!)
        .subscribe((dwellingDetail) => {
          if (!dwellingDetail.length) {
            return;
          }
          this.svcDwelling
            .getDwelling(dwellingDetail[0].id!)
            .subscribe((dwelling) => {
              this.dwelling = dwelling;
              let geolocation = this.dwelling.address.geolocation;
              this.configureMaps(geolocation);
            });
        });
    });
  }

  public goToNewDwelling() {
    this.router.navigate(['manager/dwellings/create']);
  }

  private configureMaps(geolocation: Geolocation) {
    this.configureMap = {
      lat: +geolocation.latitude,
      lon: +geolocation.longitude,
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
