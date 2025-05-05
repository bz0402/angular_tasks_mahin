import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Error Interceptor:', error.status);
        if (error) {
          switch (error.status) {
            case 401:
              this.router.navigate(['/unauthorized']);
              break;
            case 403:
              this.router.navigate(['/forbidden']);
              break;
            case 404:
              this.router.navigate(['/not-found']);
              break;
            case 500:
              this.router.navigate(['/server-error']);
              break;
            default:
              this.router.navigate(['/server-error']);
              break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}
