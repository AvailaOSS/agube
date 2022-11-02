import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '@availaoss/agube-rest-api';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { User } from '../models/user';
import { AuthRoute } from '../../auth-route';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    public cookieName = 'token';
    private userSubject: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

    constructor(
        private router: Router,
        private serviceAuth: TokenService,
        public svcNotification: NotificationService
    ) {
        this.loadToken();
    }

    public login(username: string, password: string, redirectTo: string): void {
        this.serviceAuth
            .tokenAuthCreate({
                password,
                username,
            })
            .subscribe({
                error: (e) => {
                    this.error('Usuario o contraseña incorrecto');
                },
                next: (v) => {
                    this.saveToken(v);
                    // parent project will be redirect for me
                    // FIXME: do not router.navigate here, return success and redirect out of here
                    this.router.navigate([redirectTo]);
                },
            });
    }

    public error(message: string): void {
        this.svcNotification.warning({ message });
    }

    public refresh(): void {
        if (localStorage.getItem(this.cookieName) === null) {
            return;
        }
        this.serviceAuth
            .tokenRefreshCreate({
                token: localStorage.getItem(this.cookieName)!,
            })
            .subscribe({
                next: (v) => this.saveToken(v),
                error: (e) => {
                    this.logout();
                    this.error('Logout, error in refresh token');
                },
            });
    }

    public getUser(): Observable<User | undefined> {
        return this.userSubject.asObservable();
    }

    public logout(): void {
        // remove user from local storage and set current user to null
        this.router.navigate([AuthRoute.LOGIN]);
        localStorage.removeItem(this.cookieName);
        this.userSubject.next(undefined);
    }

    private saveToken(response: any): void {
        const token = JSON.stringify(response);
        const user: User = jwt_decode(token);
        localStorage.setItem(this.cookieName, response.token);
        this.userSubject.next(user);
    }

    private loadToken(): void {
        const token = localStorage.getItem(this.cookieName);
        if (token) {
            const user: User = jwt_decode(token);
            this.userSubject.next(user);
        }

        setInterval(() => {
            this.refresh();
            // FIXME: create private variable and use here
        }, 500000);
    }
}
