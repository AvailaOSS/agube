import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../service/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to the api url

    const user = localStorage.getItem(this.accountService.cookieName);

    if (user) {
      request = request.clone({
        setHeaders: {
          Authorization: `jwt ${user}`,
        },
      });
    }
    return next.handle(request);
  }
}
