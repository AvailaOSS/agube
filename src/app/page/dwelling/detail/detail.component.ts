import {
  UserService,
  DwellingService,
  DwellingCreate,
} from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { Component, OnInit } from '@angular/core';
import { MapLocation } from 'src/app/components/street-view/view/map-location';

@Component({
  selector: 'app-page-dwelling-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public location: MapLocation = {
    latitude: 42.2291769,
    longitude: -8.719337,
    zoom: 15,
    horizontalDegree: -20,
    verticalDegree: -10,
    height: '500px',
  };

  public dwelling: DwellingCreate | undefined;

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
          this.svcDwelling
            .getDwelling(dwellingDetail[0].id!)
            .subscribe((dwelling) => {
              this.dwelling = dwelling;
              let geolocation = this.dwelling.address.geolocation
              this.location = {
                latitude: +geolocation.latitude,
                longitude: +geolocation.longitude,
                zoom: 15,
                horizontalDegree: 0,
                verticalDegree: 0,
                height: '500px',
              };
            });
        });
    });
  }
}
