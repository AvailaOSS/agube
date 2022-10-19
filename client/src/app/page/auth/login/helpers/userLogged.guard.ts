import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable({
    providedIn: 'root',
})
export class UserLoggedGuard implements CanActivate {
    constructor(private svcAccount: AccountService) {
        //
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<boolean>((resolve) => {
            this.svcAccount.getUser().subscribe((response) => {
                if (response) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}
