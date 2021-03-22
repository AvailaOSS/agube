import { AccountService } from './../login/service/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Toolbar } from './toolbar';
import { User } from 'apiaux/contact-book-rest-api-lib/src/public-api';
import { Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  public username = '';
  currentUser: User;
  currentUserSubscription: Subscription;
  @Input() public title: string;
  constructor(
    private location: Location,
    private readonly router: Router,
    private readonly svcAccountService: AccountService
  ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.svcAccountService.user.subscribe(
      (user) => {
        this.currentUser = jwt_decode(user.token);
        console.log(this.currentUser);
      }
    );

    this.checkUrl([
      { title: 'Panel de Control', url: 'control-panel' },
      { title: 'Agenda', url: 'contact-book' },
    ]);
  }

  /**
   * FIXME: Do this in service for no dependency
   * @param currentUrl
   */
  public checkUrl(currentUrl: Toolbar[]): void {
    currentUrl.forEach((url) => {
      if (this.location.path() === '/' + url.url) {
        this.title = url.title;
      }
    });
  }

  public goToControlPanel(): void {
    this.router.navigate(['/control-panel']);
  }
}
