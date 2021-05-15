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
import { AgubeEnumPaths } from './agube/agube-enum-paths';
import { AccountService } from './auth/login/service/account.service';
import { SubscriptionEnumPaths } from './subscription/subscription-enum-paths';

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
          return of(this.router.parseUrl(AgubeEnumPaths.CONTROL_PANEL));
        } else {
          return of(this.router.parseUrl(SubscriptionEnumPaths.SUBSCRIPTION));
        }
      })
    );
  }
}
