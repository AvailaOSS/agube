import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../page/auth/login/service/account.service';

@Injectable({
    providedIn: 'root',
})
export class UserGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private svcAccount: AccountService) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canLoad();
    }

    canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
