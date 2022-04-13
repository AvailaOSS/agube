import { UserDwellingDetail, UserService } from '@availa/agube-rest-api';
import { AccountService } from '@availa/auth-fe';
import { Component, OnInit } from '@angular/core';
import { MapLocation } from 'src/app/components/street-view/map-location';

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

  public dwelling: UserDwellingDetail | undefined;

  constructor(
    private svcAccount: AccountService,
    private svcUser: UserService
  ) {
    this.dwelling = undefined;
    this.svcAccount.getUser().subscribe((user) => {
      this.svcUser
        .getDwellingDetail(user!.user_id)
        .subscribe((dwelling) => (this.dwelling = dwelling[0]));
    });
  }

  ngOnInit(): void {}
}
