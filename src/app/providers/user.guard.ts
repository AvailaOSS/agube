import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { AccountService } from '@availa/auth-fe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private svcAccount: AccountService) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canLoad();
  }

  canLoad():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean | UrlTree>((resolve) => {
      this.svcAccount.getUser().subscribe((response) => {
        if (response) {
          resolve(true);
        } else {
          resolve(this.router.parseUrl(''));
        }
      });
    });
  }
}
