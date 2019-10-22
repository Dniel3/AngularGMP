import { Injectable } from '@angular/core';
import { Course } from '../core/course-model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: '1',
      title: 'Course 1',
      creationDate: 1111111,
      duration: 120,
      description: 'First Course',
    },
    {
      id: '2',
      title: 'Course 2',
      creationDate: 1111111,
      duration: 100,
      description: 'Second Course',
    },
    {
      id: '3',
      title: 'Course 3',
      creationDate: 1111111,
      duration: 90,
      description: 'Third Course',
    },
  ];

  constructor() { }

  get(): Course[] {
    return this.courses;
  }
}
