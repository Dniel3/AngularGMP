import { Course } from '../core/model/course-model';

export interface GmpState {
  courses: Course[];
}

export const initializeState = (): GmpState => {
    return { courses: [] as Course[] };
  };