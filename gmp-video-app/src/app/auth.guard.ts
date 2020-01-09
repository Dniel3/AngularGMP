import { Injectable } from '@angular/core';
import { UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { UserService } from './services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.userService.isAuth$.pipe(map(isAuth => isAuth ? isAuth : this.router.parseUrl('/login')));
  }
}
