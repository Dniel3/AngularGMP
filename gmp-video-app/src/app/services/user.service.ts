import { Injectable } from '@angular/core';
import { User } from '../core/model/user-model';
import { Login, Token } from '../core/model/login-model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { COURSES_SERVER } from '../core/constants/config';
import { shareReplay, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly user$: Observable<User|undefined>;

  readonly isAuth$ = new BehaviorSubject(localStorage.getItem('token') !== null);
  
  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.user$ =  this.isAuth$.pipe(switchMap(isAuth => isAuth ? this.http.post<User>(
      `${COURSES_SERVER}/auth/userinfo`,
      {token: localStorage.getItem('token')}).pipe(shareReplay(1)) : observableOf(undefined)))
   }

  login(login: Login) {
    this.http.post<Token>(`${COURSES_SERVER}/auth/login`, login).subscribe((response:Token) => {
      localStorage.setItem('token', response.token);
      this.isAuth$.next(true);
      this.router.navigate(['courses']);
      console.log('logged in successfully');
    });
  }

  logout() {
    this.isAuth$.next(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
