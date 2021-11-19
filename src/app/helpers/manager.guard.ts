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
import { ManagerService } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private svcManager: ManagerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canLoad(undefined, undefined);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise<boolean | UrlTree>((resolve) => {
      this.svcManager.userIsManager().subscribe((response) => {
        if (response.is_manager) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
