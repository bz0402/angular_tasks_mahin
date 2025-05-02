import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private readonly API_KEY = '93d28bd3986f44f0a8363a58ca8023d7';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('newsapi.org')) {
      return next.handle(req);
    }

    const clonedRequest = req.clone({
      setHeaders: {
        'X-Api-Key': this.API_KEY
      }
    });

    return next.handle(clonedRequest);
  }
}
