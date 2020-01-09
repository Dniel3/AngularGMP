import { Injectable } from '@angular/core';
import { User } from '../core/model/user-model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GmpState } from '../state/state';
import { Store, select } from '@ngrx/store';
import { user } from '../state/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly user$: Observable<User|undefined>;

  readonly isAuth$ = new BehaviorSubject(Boolean(localStorage.getItem('token')));
  
  constructor(private readonly http: HttpClient, private readonly router: Router, store: Store<GmpState>) {
    this.user$ = store.pipe(map(state => state.courses.user || JSON.parse(localStorage.getItem('user'))));
    store.pipe(map(state => Boolean(state.courses.token) || Boolean(localStorage.getItem('token'))))
         .subscribe(this.isAuth$);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuth$.next(false);
  }
}
