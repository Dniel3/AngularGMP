import { Course } from '../core/model/course-model';
import { User } from '../core/model/user-model';

export interface GmpState {
  courses: Course[];
  user: User|undefined;
  token: string|undefined;
}

export const initializeState = (): GmpState => {
    return { courses: [], user: undefined, token: undefined };
  };