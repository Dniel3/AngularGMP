import { Injectable } from '@angular/core';
import { Course } from '../core/course-model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ' +
    'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ' +
    'ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate ' +
    'velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in ' +
    'culpa qui officia deserunt mollit anim id est laborum';

  private courses: Course[] = [
    {
      id: '1',
      title: 'Course 1',
      creationDate: 1111111,
      duration: 120,
      description: this.longDescription,
    },
    {
      id: '2',
      title: 'Course 2',
      creationDate: 1111111,
      duration: 100,
      description: this.longDescription,
    },
    {
      id: '3',
      title: 'Course 3',
      creationDate: 1111111,
      duration: 90,
      description: this.longDescription,
    },
  ];

  constructor() { }

  get(): Course[] {
    return this.courses;
  }
}
