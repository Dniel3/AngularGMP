import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of as observableOf, observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { COURSES_SERVER } from '../../core/constants/config';
import { list, courses, remove, create, update } from './course.actions';
import { Course } from '../../core/model/course-model';
import { Login, Token } from '../../core/model/login-model';
import { User } from '../../core/model/user-model';
import { currentUser, user, login } from '../user/user.actions';
import { Router } from '@angular/router';

@Injectable()
export class CourseEffects {
  private readonly coursesUrl = `${COURSES_SERVER}/courses`;

  constructor(private readonly actions$: Actions, private readonly http: HttpClient, private readonly router: Router) { }    

  readonly listCourses$: Observable<Action> = createEffect(() =>
      this.actions$.pipe(
          ofType(list),
          switchMap(action => {
            const params = {
                'start': String(action.start),
                'count': String(action.count),
                'textFragment': action.textFragment,
            };
          
            return this.http.get<Course[]>(this.coursesUrl, { params });
          }),
          map(response => {
              return courses({courses: response});})
        )
      );

    readonly createCourse$: Observable<Action> = createEffect(() => 
      this.actions$.pipe(
        ofType(create),
        switchMap(action => this.http.post<Course>(this.coursesUrl, action.course)),
        map(() => list({
            'start': 0,
            'count': 5,
            'textFragment': '',
        }))
    ));

    readonly updateCourse$: Observable<Action> = createEffect(() => 
      this.actions$.pipe(
        ofType(update),
        switchMap(action => this.http.patch<Course>(this.coursesUrl, action.course)),
        map(() => list({
            'start': 0,
            'count': 5,
            'textFragment': '',
        }))
      ));

  readonly removeCourse$: Observable<Action> = createEffect(() => 
      this.actions$.pipe(
      ofType(remove),
      switchMap(action => this.http.delete<Course>(`${this.coursesUrl}/${action.id}`)),
      map(() => list({
          'start': 0,
          'count': 5,
          'textFragment': '',
      }))
  ));

  readonly login$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
        ofType(login),
        switchMap(action => localStorage.getItem('token') ? 
              observableOf({token: localStorage.getItem('token')}) : 
              this.http.post<Token>(`${COURSES_SERVER}/auth/login`, action.login)),
        map(response => {       
          this.router.navigate(['courses']);
          localStorage.setItem('token', response.token);
          return user(response);
        }),
    )
  );

  readonly user$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
        ofType(user),
        switchMap(action => localStorage.getItem('user') ?
              observableOf(JSON.parse(localStorage.getItem('user'))) :
              this.http.post<User>(`${COURSES_SERVER}/auth/userinfo`, {token: action.token})),
        map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          return currentUser({user});}),
    )
  );
}