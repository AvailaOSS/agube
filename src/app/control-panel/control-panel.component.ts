import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isNull } from 'lodash';
import { AccountService } from '../auth/login/service/account.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;

  constructor(
    private router: Router,
    private readonly svcAccountService: AccountService
  ) {
    this.svcAccountService.getUser().subscribe((value) => {
      if (isNull(value)) {
        this.svcAccountService.logout();
      }
    });
  }

  public ngOnInit(): void {
    this.users = this.svcAccountService.getUser();
  }

  public goTo(route: any): void {
    this.router.navigate([route]);
  }
}
