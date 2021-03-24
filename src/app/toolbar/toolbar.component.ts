import { AccountService } from './../login/service/account.service';
import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public user = undefined;

  public currentItem = 'Television';

  constructor(
    private readonly svcAccountService: AccountService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.user = jwt_decode(this.svcAccountService.userValue.token);
    if (this.user) {
      this.router.navigate(['/control-panel']);
    }
  }
}
