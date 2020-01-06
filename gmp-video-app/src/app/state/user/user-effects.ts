import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, act } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { COURSES_SERVER } from '../../core/constants/config';
import { login, user, currentUser } from './user.actions';
import { Login, Token } from '../../core/model/login-model';
import { User } from '../../core/model/user-model';


@Injectable()
export class UserEffects {
  constructor(private readonly actions$: Actions, private readonly http: HttpClient) { }    

  readonly login$: Observable<Action> = createEffect(() => 
      this.actions$.pipe(
          ofType(login),
          switchMap(action => this.http.post<Token>(`${COURSES_SERVER}/auth/login`, action.login)),
          map(response => user({token: response.token})),
      )
    );

  readonly user$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
        ofType(user),
        switchMap(action => this.http.post<User>(`${COURSES_SERVER}/auth/userinfo`,
            {token: action.token})),
        map(user => currentUser({user})),
    )
  );
}