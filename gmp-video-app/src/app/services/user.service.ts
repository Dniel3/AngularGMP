import { Injectable } from '@angular/core';
import { User } from '../core/model/user-model';
import { Login, Token } from '../core/model/login-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COURSES_SERVER } from '../core/constants/config';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<User>;
  
  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  get() {
    this.user$ = this.http.post<User>(
        `${COURSES_SERVER}/auth/userinfo`,
        {token: localStorage.getItem('token')}).pipe(shareReplay(1));
  }

  getUser(): Observable<User> {
    return this.user$;
  }

  login(login: Login) {
    this.http.post<Token>(`${COURSES_SERVER}/auth/login`, login).subscribe((response:Token) => {
      localStorage.setItem('token', response.token);
      this.get();
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
