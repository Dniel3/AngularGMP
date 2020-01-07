import { Injectable } from '@angular/core';
import { User } from '../core/model/user-model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GmpState } from '../state/state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly user$: Observable<User|undefined>;

  readonly isAuth$ = new BehaviorSubject(localStorage.getItem('token') !== null);
  
  constructor(private readonly http: HttpClient, private readonly router: Router, store: Store<GmpState>) {
    this.user$ = store.pipe(map(state => state.courses.user));
  }

  logout() {
    this.isAuth$.next(false);
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
