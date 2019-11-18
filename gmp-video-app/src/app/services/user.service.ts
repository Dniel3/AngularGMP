import { Injectable } from '@angular/core';
import { User } from '../core/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = {
    id: '1',
    name: 'Olek',
    lastName: 'Pogrebniak',
  }

  constructor() { }

  get(): User {
    return this.user;
  }

  login(user: string = this.user.name, password: string = this.user.id) {
    localStorage.setItem('user', user);
    localStorage.setItem('lastName', this.user.lastName);
    localStorage.setItem('id', this.user.id);
    localStorage.setItem('token', user + password);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('lastName');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
