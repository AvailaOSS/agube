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

@Component({
  selector: 'app-page-dwelling-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public location: MapLocation | undefined;
  public configureMap: ConfigureMap | undefined;

  public dwelling: DwellingCreate | undefined;

  public mode: string = 'map';
  constructor(
    private svcAccount: AccountService,
    private svcUser: UserService,
    private svcDwelling: DwellingService
  ) {
    this.dwelling = undefined;
  }

  ngOnInit(): void {
    this.svcAccount.getUser().subscribe((user) => {
      this.svcUser
        .getDwellingDetail(user!.user_id)
        .subscribe((dwellingDetail) => {
          console.log(dwellingDetail)
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
      zoom: 15,
      horizontalDegree: 0,
      verticalDegree: 0,
      height: '500px',
      width: '500px',
    };
  }
}
