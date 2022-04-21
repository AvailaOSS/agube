import { Component, Input, OnInit } from '@angular/core';
import { UserService, UserDetail } from '@availa/agube-rest-api';

@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',
  styleUrls: ['../info.component.scss'],
})
export class ResidentComponent implements OnInit {
  @Input() public userId: number | undefined;
  public userDetail: UserDetail | undefined;
  constructor(private svcUser: UserService) {}

  ngOnInit(): void {
    this.svcUser.getUserDetail(this.userId!).subscribe((response) => {
      this.userDetail = response;
    });
  }
}
