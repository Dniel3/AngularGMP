import { Action, createReducer, on } from '@ngrx/store';
import { initializeState, GmpState } from '../state';
import { list, courses } from './course.actions';

const reducer =  createReducer(initializeState(),
    on(list, state => state),
    on(courses, (state: GmpState, { courses }) => {
        return { ...state, courses };
      }),);

export function CourseReducer(state: GmpState | undefined, action: Action) {
  return reducer(state, action);
}