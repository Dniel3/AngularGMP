import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumComponent } from './breadcrum.component';
import { Router, NavigationEnd, RouterModule, RouterEvent, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { of as observableOf, ReplaySubject } from 'rxjs';
import { Course } from '../course-model';
import { RouterTestingModule } from '@angular/router/testing';

describe('BreadcrumComponent', () => {
  let component: BreadcrumComponent;
  let fixture: ComponentFixture<BreadcrumComponent>;
  let fakeCourseService: jasmine.SpyObj<CourseService>;
  const fakeCourse: Course = { 
    id: '1', 
    title: 'fakeTitle', 
    duration: 1, 
    creationDate: new Date(), 
    description: 'foo' 
  };
  const routerEvents$ = new ReplaySubject<RouterEvent>(1);

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['getById']);
    const fakeRouter = {
      navigate: jasmine.createSpy('navigate'),
      events: routerEvents$.asObservable(),
      url: 'test/url',
    };

    fakeCourseService.getById.and.returnValue(fakeCourse);
    TestBed.configureTestingModule({
      declarations: [BreadcrumComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: CourseService, useValue: fakeCourseService
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.get(ActivatedRoute).firstChild = {routeConfig: {
      breadcrumb: 'courses',
      path: 'courses/:id'

    },
    snapshot: {
      paramMap: [['id', '9']],
    }
  };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call course service to get course title', () => {
    TestBed.get(Router).events.next(new NavigationEnd(0, '/courses/9', '/courses/9'));

    expect(fakeCourseService.getById).toHaveBeenCalledWith('9');
  });

  it('should render breadcrum', () => {
    TestBed.get(Router).events.next(new NavigationEnd(0, '/courses/9', '/courses/9'));
    fixture.detectChanges();
    const breadCrumWithLink = fixture.nativeElement.querySelector('a');

    expect(breadCrumWithLink[0].innerText).toContain('courses');
    expect(breadCrumWithLink[1].innerText).toContain('courses');
    expect(breadCrumWithLink[2].innerText).toContain(fakeCourse.title);
  });
});
