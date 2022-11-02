import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedRequest = request;
    let accessToken: string = this.tokenService.getAccessToken();
    if (accessToken) {
      modifiedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }
    return next.handle(modifiedRequest);
  }
}
