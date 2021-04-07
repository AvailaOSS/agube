import { Permission } from './../../../../apiaux/subscription-rest-api-lib/src/lib/model/permission';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionsHasSubscription } from '../../../../apiaux/subscription-rest-api-lib/src/lib/model/permissionsHasSubscription';
import {
  Subscription,
  SubscriptionService,
} from 'apiaux/subscription-rest-api-lib/src/public-api';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  public subscriptions: Subscription[];

  public permissionColumns: PermissionsHasSubscription[];
  public enablePermission: any[]=[];

  constructor(
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) {
    this.subscriptionService.getSubscriptions().subscribe((subscriptions) => {
      this.subscriptions = subscriptions;
    });
    this.subscriptionService.getPermissions().subscribe((permissos) => {
      this.permissionColumns = permissos;

      console.log(this.permissionColumns);
      this.permissionColumns.forEach((ps) => {
        ps.subscriptions.forEach((pss) => {
          this.enablePermission.push(pss.id)
        });
      });
    });
  }

  public ngOnInit(): void {}
  public sendUrl(url: string): void {
    this.router.navigate(['/forms', { id: url }]);
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
