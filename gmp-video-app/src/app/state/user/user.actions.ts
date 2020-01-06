import { createAction, props } from '@ngrx/store';
import { Login } from '../../core/model/login-model';
import { User } from '../../core/model/user-model';

export const login = createAction('[User] Login',
    props<{login: Login}>());

export const user = createAction('[User] User',
    props<{token: string}>());

export const currentUser = createAction('[User] CurrentUser',
    props<{user: User}>());

export const token = createAction('[User] Token',
    props<{token: string}>());
