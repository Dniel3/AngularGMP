import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingSpinnerService } from '../loading-spinner.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoadingSpinnerService) {}
  intercept(req: HttpRequest <any> , next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(req).pipe(tap((event: HttpEvent<any> ) => {
        if (event instanceof HttpResponse) {
          this.onEnd();
        }
      },
      (err: any) => {
        this.onEnd();
      }));
  }
  private onEnd(): void {
    this.loaderService.hide();
  }
}
