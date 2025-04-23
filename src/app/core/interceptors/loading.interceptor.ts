import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  activeRequests: number = 0;

  constructor(private loadingService: LoadingService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
        this.loadingService.isLoading.next(true);
    }
    this.activeRequests++;
    return next.handle(request).pipe(
        finalize(() => {
            this.activeRequests--;
            if (this.activeRequests === 0) {
               this.loadingService.isLoading.next(false);
            }
        })
    )
  };
}
