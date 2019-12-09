import { Injectable } from '@angular/core';
import { Course } from '../core/model/course-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private readonly http: HttpClient) {  }

  get(start: number, count: number, textFragment: string): Observable<Course[]> {
    const coursesUrl = 'http://localhost:3004/courses';
    const params = {
      'start': String(start),
      'count': String(count),
      'textFragment': textFragment,
    };

    return this.http.get<Course[]>(coursesUrl, { params });
  }

  create(course: Course): Observable<Course> {
    const coursesUrl = 'http://localhost:3004/courses';
    return this.http.post<Course>(coursesUrl, course);
  }

  getById(id: number): Observable<Course> {
    const coursesUrl = `http://localhost:3004/courses/${id}`;
    return this.http.get<Course>(coursesUrl);
  }

  update(updatedCourse: Course): Observable<Course> {
    const coursesUrl = 'http://localhost:3004/courses';
    return this.http.patch<Course>(coursesUrl, updatedCourse);
  }

  delete(id: number): Observable<Course> {
    const coursesUrl = `http://localhost:3004/courses/${id}`;
    return this.http.delete<Course>(coursesUrl);
  }
}
