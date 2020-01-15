import { createAction, props } from '@ngrx/store';
import { Course } from '../../core/model/course-model';

/** Action to list all available courses. */
export const list = createAction('[Course] List', 
    props<{start: number, count: number, textFragment: string}>());

export const courses = createAction('[Course] Courses', 
    props<{courses: Course[]}>());

/** Action to create a course. */
export const create = createAction('[Course] Create',
    props<{course: Course}>());

/** Action to get an specific course. */
export const get = createAction('[Course] Get');

/** Action to update course data. */
export const update = createAction('[Course] Update',
    props<{course: Course}>());

/** Action to delete a course. */
export const remove = createAction('[Course] Remove',
    props<{id: number, textFragment: string}>());