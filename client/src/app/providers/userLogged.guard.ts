import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '@availaoss/agube-rest-api';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserLoggedGuard implements CanActivate {
    constructor(private router: Router, private svcAccount: AccountService) {
        //
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<boolean | UrlTree>((resolve) => {
            this.svcAccount.getUser().subscribe((response) => {
                if (response) {
                    resolve(this.router.parseUrl('manager'));
                } else {
                    resolve(true);
                }
            });
        });
    }
}
