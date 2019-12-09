import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
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
  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.breadCrums$ = router.events.pipe(
      startWith(new NavigationEnd(0, '/courses', '/courses')),
      filter(event => event instanceof NavigationEnd),
      map(event => this.buildBreadCrumb(activatedRoute.root)));
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: BreadCrumb[] = []): BreadCrumb[] {
    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;
    const breadcrumb: BreadCrumb = {
      label: label,
      url: nextUrl
    };

    let newBreadcrumbs = [...breadcrumbs, breadcrumb];

    const courseId = route.snapshot.paramMap.get('id');

    if (courseId) {
      breadcrumb.url = breadcrumb.url.replace(':id/', '');
      newBreadcrumbs.push({
        label: courseId === 'new' ? courseId : 'Edit',
         url: `courses/${courseId}`
        }
      );
    }

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
