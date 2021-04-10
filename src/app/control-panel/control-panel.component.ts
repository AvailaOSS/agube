import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../login/service/account.service';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss'],
})
export class ControlPanelComponent implements OnInit {
  public users: any;

  constructor(private router: Router,private readonly svcAccountService: AccountService) {}

  public ngOnInit(): void {
    this.users = this.svcAccountService.getUser();
  }

  public goTo(route) {
    this.router.navigate([route]);
  }
}
