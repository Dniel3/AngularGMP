import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmp-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumComponent {
  readonly breadCrums$: Observable<string[]>;
  constructor(router: Router, courseService: CourseService) {
    this.breadCrums$ = router.events.pipe(
      startWith(new NavigationEnd(0, '/courses', '/courses')),
      filter(event => event instanceof NavigationEnd),
      map((router: NavigationEnd) => {
        const paths = router.urlAfterRedirects;
        const breadCrums = paths.split('/').filter(Boolean);
        if (breadCrums[0] === 'courses' && breadCrums.length === 2 && breadCrums[1] !== 'new') {
          const currentCourse = courseService.getById(breadCrums[breadCrums.length - 1]);
          breadCrums[breadCrums.length - 1] = currentCourse.title;
        }
        return breadCrums;
      }));
  }
}
