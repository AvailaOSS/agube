import { SidebarRoute } from './../page/home/sidebar-route';
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { ManagerService } from '@availaoss/agube-rest-api';
import { Observable } from 'rxjs';
import { AccountService } from '../page/auth/login/service/account.service';

@Injectable({
    providedIn: 'root',
})
export class ManagerGuard implements CanActivate, CanLoad {
    constructor(private router: Router, private svcManager: ManagerService, private svcAccount: AccountService) {}

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canLoad();
    }

    canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return new Promise<boolean | UrlTree>((resolve) => {
            this.svcManager.userIsManager().subscribe({
                next: (response) => {
                    if (response.is_manager) {
                        resolve(true);
                    } else {
                        resolve(this.router.parseUrl(SidebarRoute.CLIENT));
                    }
                },
                error: (error) => {
                    if (error.status === 401) {
                        this.svcAccount.logout();
                    }
                },
            });
        });
    }
}
