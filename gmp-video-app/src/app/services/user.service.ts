import { Injectable } from '@angular/core';
import { User } from '../core/model/user-model';
import { Login, Token } from '../core/model/login-model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { COURSES_SERVER } from '../core/constants/config';
import { shareReplay, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<User>;

  private readonly token$ = new BehaviorSubject(null);
  
  constructor(private readonly http: HttpClient, private readonly router: Router) {
    this.user$ =  this.token$.pipe( switchMap(token => this.http.post<User>(
      `${COURSES_SERVER}/auth/userinfo`,
      {token: localStorage.getItem('token')}).pipe(shareReplay(1))))
   }

  getUser(): Observable<User> {
    return this.user$;
  }

  login(login: Login) {
    this.http.post<Token>(`${COURSES_SERVER}/auth/login`, login).subscribe((response:Token) => {
      localStorage.setItem('token', response.token);
      this.token$.next(null);
      this.router.navigate(['courses']);
      console.log('logged in successfully');
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
