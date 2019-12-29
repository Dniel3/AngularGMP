import { Injectable } from '@angular/core';
import { Course } from '../core/model/course-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { COURSES_SERVER } from '../core/constants/config';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly coursesUrl = `${COURSES_SERVER}/courses`;
  constructor(private readonly http: HttpClient) {  }

  get(start: number, count: number, textFragment: string): Observable<Course[]> {
    const params = {
      'start': String(start),
      'count': String(count),
      'textFragment': textFragment,
    };

    return this.http.get<Course[]>(this.coursesUrl, { params });
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.coursesUrl}/${id}`);
  }

  update(updatedCourse: Course): Observable<Course> {
    return this.http.patch<Course>(this.coursesUrl, updatedCourse);
  }

  delete(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.coursesUrl}/${id}`);
  }
}
