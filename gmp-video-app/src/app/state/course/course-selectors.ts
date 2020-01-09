import { createSelector } from '@ngrx/store';
import { GmpState } from '../state';

export const selectFeature = (state: GmpState) => state.courses;


export const coursesSelector = createSelector(
    selectFeature,
    (courses) => courses
);