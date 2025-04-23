import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDto } from 'src/app/API/models/errorDto';
import Popup from '../utils/popup';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {

        if(error instanceof HttpErrorResponse){
          this.handleError(error);
        }

        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {

    console.error(error)

    if(error.status == 0 && error.error instanceof ProgressEvent){
      Popup.error(error.error.type, 'Oops! There was a probem with the request');
    }
    else if(error.error && typeof(error.error) == 'object') {
      const e = error.error as ErrorDto;
      Popup.error(e.detail, e.title, `Code: ${e.status}, Problem ID: ${e.instance}`);
    }
    else if(error.error && (typeof error.error === 'string' || error.error instanceof String)) {
      Popup.error(error.error.toString(), 'Oops! There was a probem with the request');
    }
    else Popup.error(`${error.status} - ${error.statusText}`, 'Oops! There was a probem with the request');
  }
}
