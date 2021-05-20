import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  PermissionsHasSubscription,
  Subscription,
  SubscriptionService,
} from 'apiaux/subscription-rest-api-lib/src/public-api';
import { SubscriptionRoute } from './subscription-route';
import { SubscriptionService as SubscriptionConfigService } from './subscription.service';

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
    private readonly subscriptionService: SubscriptionService,
    private readonly subscriptionConfigService: SubscriptionConfigService
  ) {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
    });
    this.subscriptionService.getPermissions().subscribe((permissions) => {
      this.permissionColumns = permissions;
    });
  }

  public ngOnInit(): void {}

  public sendUrl(url: string): void {
    this.router.navigate([SubscriptionRoute.CREATE_ACCOUNT, { id: url }]);
  }
}
