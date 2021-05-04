import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PermissionsHasSubscription,
  Subscription,
  SubscriptionService,
} from 'apiaux/subscription-rest-api-lib/src/public-api';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  public subscriptions: Subscription[];

  public permissionColumns: PermissionsHasSubscription[];
  public enablePermission: any[] = [];

  constructor(
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
    });
    this.subscriptionService.getPermissions().subscribe((permissos) => {
      this.permissionColumns = permissos;
    });
  }

  public ngOnInit(): void {}
  public sendUrl(url: string): void {
    this.router.navigate(['/create-account', { id: url }]);
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
