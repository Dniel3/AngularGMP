import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { Course } from '../core/course-model';

describe('CourseService', () => {
  let courseService: CourseService;
  const newCourse: Course = {
    id: 'foo',
    creationDate: new Date(),
    description: 'foobarzfoo',
    duration: 111,
    title: 'new',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    courseService = TestBed.get(CourseService);
   }
  );

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should return courses', () => {
    expect(courseService.get()).toBeDefined();
  })

  it('should create course', () => {
    courseService.create(newCourse);

    expect(courseService.get().find(course => course.id = newCourse.id)).toBeDefined();
  })

  it('should get course by id', () => {
    courseService.create(newCourse);

    expect(courseService.getById(newCourse.id)).toBeDefined();
  })

  it('should update course', () => {
    courseService.create(newCourse);
    newCourse.topRated = true;

    courseService.update(newCourse)

    expect(courseService.get().find(course => course.id = newCourse.id).topRated).toBe(true);
  })

});
