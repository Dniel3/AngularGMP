import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/model/course-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterCoursePipe } from './filter-course.pipe';
import { Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'gmp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterCoursePipe]
})
export class CourseListComponent {
  private getCoursesRequest = {
    start: 0,
    count: 5,
    textFragement: ''
  };

  private readonly newSearch$ = new BehaviorSubject(this.getCoursesRequest);

  readonly courses$: Observable<Course[]>;

  @Input()
  set filter(filter: string) {
    this.newSearch$.next({
      start: 0,
      count: 5,
      textFragement: filter
    });
  }

  constructor(private readonly courseService: CourseService,
    private readonly filterPipe: FilterCoursePipe,
    private readonly router: Router) {
    this.courses$ = this.newSearch$.pipe(
      switchMap(
        (request) =>
          this.courseService.get(request.start, request.count, request.textFragement)
      )
    );
  }

  remove(id: number) {
    if (window.confirm("Do you really want to delete this course?")) {
      this.courseService.delete(id).pipe(map(() => this.getCoursesRequest)).subscribe(this.newSearch$);
    }
  }

  edit(id: number) {
    this.router.navigate(['courses', id]);
  }

  loadMore() {
    this.newSearch$.value.count += 5;
    this.newSearch$.next(this.newSearch$.value);
    console.log('Load more');
  }
}
