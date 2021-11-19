import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService, AuthRoute } from '@availa/auth-fe';
import { User } from '@availa/auth-fe/lib/login/models/user';

@Component({
  selector: 'app-sub-router',
  templateUrl: './sub-router.component.html',
})
export class SubRouterComponent implements OnInit {
  public title: string;
  public user: User;
  public toolbarName: string;
  public hiddeToolbar: boolean;

  constructor(
    private readonly accountService: AccountService,
    private router: Router
  ) {}
  public ngOnInit(): void {
    this.accountService.getUser().subscribe((value) => {
      if (value === null) {
        this.hiddeToolbar = true;
        this.router.navigate([
          { outlets: { primary: AuthRoute.LOGIN, contactPopup: null } },
        ]);
      } else {
        this.user = value;
        this.hiddeToolbar = false;
      }
    });
  }
  public logout(): void {
    this.accountService.logout();
    this.router.navigate([
      { outlets: { primary: AuthRoute.LOGIN, contactPopup: null } },
    ]);
  }

  public getSelectedComponent(componentName: string): void {
    this.toolbarName = componentName;
  }
}
