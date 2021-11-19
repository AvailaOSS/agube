import { Component, OnInit } from '@angular/core';
import { AccountService, AuthRoute } from '@availa/auth-fe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public hiddeToolbar: boolean;
  public title = 'Agube';
  constructor(
    private readonly accountService: AccountService,
    private router: Router
  ) {}
  public ngOnInit(): void {
    this.accountService.getUser().subscribe((value) => {
      if (value !== null) {
        this.hiddeToolbar = true;
      } else {
        this.hiddeToolbar = false;
      }
    });
  }

  public goToRegister(): void {
    this.router.navigate([
      { outlets: { primary: AuthRoute.LOGIN, contactPopup: null } },
    ]);
  }
  public goSupport(): void {
    this.router.navigate([
      { outlets: { primary: 'support', contactPopup: null } },
    ]);
  }
  public goToWeb(): void {
    window.location.href = 'https://google.com/about';
  }
}
