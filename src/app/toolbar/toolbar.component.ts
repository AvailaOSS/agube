import { AccountService } from './../login/service/account.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public user = undefined;

  constructor(private readonly svcAccountService: AccountService) {}

  ngOnInit(): void {
    this.user = jwt_decode(this.svcAccountService.userValue.token);
    console.log(this.user.username);
  }
}
