import { Injectable } from '@angular/core';
import { User } from '../core/model/user-model';
import { Login, Token } from '../core/model/login-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$: Observable<User>;
  
  constructor(private readonly http: HttpClient) { }

  get() {
    const userUrl = 'http://localhost:3004/auth/userinfo'
    this.user$ = this.http.post<User>(userUrl, {token: localStorage.getItem('token')});
  }

  getUser(): Observable<User> {
    return this.user$;
  }

  login(login: Login): Observable<Token> {
    const loginUrl = 'http://localhost:3004/auth/login'
    return this.http.post<Token>(loginUrl, login);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
