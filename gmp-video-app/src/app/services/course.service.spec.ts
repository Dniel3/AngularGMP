import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CourseService } from './course.service';
import { Course } from '../core/model/course-model';

describe('CourseService', () => {
  let courseService: CourseService;
  let httpMock: HttpTestingController;
  const coursesUrl = 'http://localhost:3004/courses';
  const newCourse: Course = {
    id: 1,
    date: new Date().toISOString(),
    description: 'foobarzfoo',
    length: 111,
    name: 'new',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    courseService = TestBed.get(CourseService);
    httpMock = TestBed.get(HttpTestingController);
   }
  );

  it('should be created', () => {
    expect(courseService).toBeTruthy();
  });

  it('should return courses', () => {
    const fakeCourses = [
      {
        id: 2,
        name: 'foo',
        length: 9,
        description: 'barz',
        date: 'now',
      },
      newCourse,
    ];

    courseService.get(0, 5, '').subscribe(courses => {
      expect(courses).toBe(fakeCourses);
    });

    const req = httpMock.expectOne(coursesUrl);
    req.flush(fakeCourses);
  });

  it('should create course', () => {
    courseService.create(newCourse).subscribe(course => {
      expect(course).toBe(newCourse);
    });

    const req = httpMock.expectOne(coursesUrl);
    req.flush(newCourse);
  });

  it('should get course by id', () => {
    courseService.getById(newCourse.id).subscribe( course => {
      expect(course).toBe(newCourse);
    })

    const req = httpMock.expectOne(`${coursesUrl}/${newCourse.id}`);
    req.flush(newCourse);
  });

  it('should update course', () => {
    newCourse.isTopRated = true;

    courseService.update(newCourse).subscribe(course => {
      expect(course).toBe(newCourse);
    });

    const req = httpMock.expectOne(coursesUrl);
    req.flush(newCourse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
