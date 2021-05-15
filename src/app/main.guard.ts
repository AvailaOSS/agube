import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AgubeRoute } from './agube/agube-route';
import { AccountService } from './auth/login/service/account.service';
import { SubscriptionRoute } from './subscription/subscription-route';

@Injectable({
  providedIn: 'root',
})
export class MainGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.accountService.getUser().pipe(
      switchMap((response) => {
        if (response) {
          return of(this.router.parseUrl(AgubeRoute.CONTROL_PANEL));
        } else {
          return of(this.router.parseUrl(SubscriptionRoute.SUBSCRIPTION));
        }
      })
    );
  }
}
