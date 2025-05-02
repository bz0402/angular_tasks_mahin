import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  private readonly API_KEY = environment.apiKey; // Using environment variable is best practice

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('newsapi.org')) {
      return next.handle(req);
    }

    const clonedRequest = req.clone({
      setParams: {
        apiKey: this.API_KEY
      }
    });

    return next.handle(clonedRequest);
  }
}
