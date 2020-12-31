import { SubscriptionService } from 'agube-rest-api-lib';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent implements OnInit {
  public subscription: any;
  constructor(
    private readonly router: Router,
    private readonly subscriptionService: SubscriptionService
  ) {}

  public ngOnInit(): void {
    this.subscriptionService.subscriptionList().subscribe((value) => {
      this.subscription = value;
    });
  }

  public sendUrl(url: string): void {
    this.router.navigate(['/forms', { id: url }]);
  }
}
