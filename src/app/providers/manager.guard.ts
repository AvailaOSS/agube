import { HomeRoute } from './../home/home-route';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { ManagerService } from '@availa/agube-rest-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private svcManager: ManagerService) {}

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
      this.svcManager.userIsManager().subscribe((response) => {
        if (response.is_manager) {
          resolve(true);
        } else {
          resolve(this.router.parseUrl(HomeRoute.CLIENT));
        }
      });
    });
  }
}
