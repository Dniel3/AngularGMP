import { Component, Input } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/model/course-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterCoursePipe } from './filter-course.pipe';
import { Router } from '@angular/router';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { GmpState } from '../../state/state';
import { Store, select } from '@ngrx/store';
import { list, remove } from '../../state/course/course.actions';

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

  readonly courseState$: Observable<Course[]>;

  @Input()
  set filter(filter: string) {
    this.newSearch$.next({
      start: 0,
      count: 5,
      textFragement: filter
    });
  }

  constructor(private readonly store: Store<GmpState>,
    private readonly courseService: CourseService,
    private readonly filterPipe: FilterCoursePipe,
    private readonly router: Router) {
    this.courseState$ = this.store.pipe(select('courses'));
    
    this.newSearch$.pipe(filter(req => req.textFragement.length > 3 || req.textFragement === ''),
      debounceTime(300),
      distinctUntilChanged()).subscribe(
        (request) =>
          this.store.dispatch(list({start: request.start, count: request.count, textFragment: request.textFragement}))
      );
  }

  remove(id: number) {
    if (window.confirm("Do you really want to delete this course?")) {
      this.store.dispatch(remove({id}));
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
