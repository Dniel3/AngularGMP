import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, startWith, distinctUntilChanged } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { Observable } from 'rxjs';
import { BreadCrumb } from './breadcrum-model';

@Component({
  selector: 'gmp-breadcrum',
  templateUrl: './breadcrum.component.html',
  styleUrls: ['./breadcrum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumComponent {
  readonly breadCrums$: Observable<BreadCrumb[]>;
  constructor(router: Router, private readonly courseService: CourseService, activatedRoute: ActivatedRoute) {
    this.breadCrums$ = router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event => this.buildBreadCrumb(activatedRoute.root)));    
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '', 
                breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
                  console.log(route);
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;
    const breadcrumb: BreadCrumb = {
        label: label,
        url: nextUrl
    };

    let newBreadcrumbs = [...breadcrumbs, breadcrumb];

    const courseId = route.snapshot.paramMap.has('id') ? route.snapshot.paramMap.get('id') : '';

    if(courseId) {
      const courseBreadcrum = {
        label: 'new',
        url: null,
      };

      breadcrumb.url = breadcrumb.url.replace(':id/', '');
      const course = courseId !== 'new' ? this.courseService.getById(courseId) : undefined;
      courseBreadcrum.label = course ? course.title : 'new';
      courseBreadcrum.url = `courses/${courseId}`;
      newBreadcrumbs.push(courseBreadcrum);
    }

    if (route.firstChild) {
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
}
}
