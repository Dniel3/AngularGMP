import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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