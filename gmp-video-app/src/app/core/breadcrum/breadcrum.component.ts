import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmp-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss']
})
export class BreadcrumComponent {
  breadCrums$: Observable<string[]>;
  constructor(router: Router, courseService: CourseService) {
    this.breadCrums$ = router.events.pipe(filter(event => event instanceof NavigationEnd), map((router: NavigationEnd) => {
      const paths = router.url;
      const breadCrums = paths.split('/').filter(Boolean);
      if (paths.includes('courses') && breadCrums[breadCrums.length - 1] !== 'courses'
        && breadCrums[breadCrums.length - 1] !== 'new') {
        const currentCourse = courseService.getById(breadCrums[breadCrums.length - 1]);
        breadCrums[breadCrums.length - 1] = currentCourse.title;
      }
      return breadCrums;
    }));
  }
}
