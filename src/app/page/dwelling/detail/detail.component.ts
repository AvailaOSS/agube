import {
  UserService,
  DwellingService,
  DwellingCreate,
  Geolocation,
} from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { Component, OnInit } from '@angular/core';
import { MapLocation } from 'src/app/components/map/view/map-location';
import { ConfigureMap } from '../../../components/map/map/configure-map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-dwelling-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public userId: number | undefined;
  public dwelling: DwellingCreate | undefined;

  // map
  public location: MapLocation | undefined;
  public configureMap: ConfigureMap | undefined;
  // map config
  public mode: string = 'map';
  private mapZoomDefault: number = 15;
  private mapStreetViewPositionDegree: number = 0;
  private mapHeight: string = '500px';
  private mapWidth: string = this.mapHeight;

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
    };
    this.location = {
      latitude: +geolocation.latitude,
      longitude: +geolocation.longitude,
      zoom: this.mapZoomDefault,
      horizontalDegree: this.mapStreetViewPositionDegree,
      verticalDegree: this.mapStreetViewPositionDegree,
      height: this.mapHeight,
      width: this.mapWidth,
    };
  }
}
