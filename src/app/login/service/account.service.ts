import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { TokenService } from '../../../../apiaux/agube-rest-api-lib/src/lib/service/token.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

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
        username: username,
        password: password,
      })
      .subscribe(
        (response) => {
          this.saveToken(response);
          this.router.navigate(['/control-panel']);
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
    this.userSubject.next(null);
    this.router.navigate(['/account/login']);
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
