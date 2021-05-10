import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { TokenService } from 'apiaux/auth-rest-api-lib/src/public-api';
import { agubeEnumPaths } from '../../../agube/agube-enum-paths';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public cookieName = 'token';
  public loginPage: boolean;
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private router: Router, private serviceAuth: TokenService) {
    this.loadToken();
  }

  public login(username, password): void {
    this.serviceAuth
      .tokenAuthCreate({
        username,
        password,
      })
      .subscribe(
        (response) => {
          this.saveToken(response);
          this.router.navigate([agubeEnumPaths.CONTROLPANEL]);
          this.loginPage = true;
        },
        (error) => alert('ERROR LOGGING')
      );
  }

  public refresh(): void {
    this.serviceAuth
      .tokenRefreshCreate({
        token: localStorage.getItem(this.cookieName),
      })
      .subscribe(
        (response) => this.saveToken(response),
        (error) => alert('ERROR LOGGING')
      );
  }

  public getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem(this.cookieName);
    this.userSubject.next(undefined);
    this.router.navigate(['/login']);
    this.loginPage = false;
  }

  private saveToken(response): void {
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
  }
}
