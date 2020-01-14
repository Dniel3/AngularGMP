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

  readonly isAuth$ = new BehaviorSubject(Boolean(localStorage.getItem('token')));
  
  logout() {
    localStorage.removeItem('token');
    this.isAuth$.next(false);
  }
}
