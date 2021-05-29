import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AccountService, AuthRoute } from '@availa/auth-fe';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AgubeRoute } from './agube/agube-route';
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
          // if user logged redirect to control panel
          return of(this.router.parseUrl(AgubeRoute.CONTROL_PANEL));
        } else {
          // else return to subscription
          return of(this.router.parseUrl(SubscriptionRoute.SUBSCRIPTION));
        }
      })
    );
  }
}
