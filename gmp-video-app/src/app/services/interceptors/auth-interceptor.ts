import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { GmpState } from 'src/app/state/state';
import { Store, select } from '@ngrx/store';
import { switchMap, concatMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly store: Store<GmpState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if(!req.url.includes('login')) {
            req = req.clone({
                headers: new HttpHeaders({
                    ['Authorization']: localStorage.getItem('token'),
                })
            });
        }
        return next.handle(req);
    }
}