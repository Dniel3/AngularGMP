import { Action, createReducer, on } from '@ngrx/store';
import { initializeState, GmpState } from '../state';
import { list, courses } from './course.actions';
import { user, currentUser, token } from '../user/user.actions';

const reducer =  createReducer(initializeState(),
    on(list, state => state),
    on(courses, (state: GmpState, { courses }) => {
        return { courses: courses, token: state.token, user: state.user };
      }),
    on(user, (state: GmpState, { token }) => {
      return { ...state, token };
    }),
    on(currentUser, (state: GmpState, { user }) => {
      return { ...state, user };
    }),
    on(token, (state: GmpState, { token }) => {
      return { ...state, token }
    }));

export function CourseReducer(state: GmpState | undefined, action: Action) {
  return reducer(state, action);
}