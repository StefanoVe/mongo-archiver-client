import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const serverUrl = this.authService.serverUrl;

    const isApiUrl = request.url.startsWith(serverUrl);
    if (serverUrl && isApiUrl) {
      request = request.clone({
        setHeaders: this.authService.apiHeaders.headers,
      });
    }

    return next.handle(request);
  }
}
