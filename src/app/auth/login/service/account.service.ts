import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'apiaux/auth-rest-api-lib/src/public-api';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { AgubeRoute } from '../../../agube/agube-route';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public cookieName = 'token';
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
          this.router.navigate([AgubeRoute.CONTROL_PANEL]);
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
    this.router.navigate(['/login']);
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

    setInterval(() => {
      this.refresh();
    }, 500000);
  }
}
