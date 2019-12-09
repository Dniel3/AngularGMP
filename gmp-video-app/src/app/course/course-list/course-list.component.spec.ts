import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/model/course-model';
import { FilterCoursePipe } from './filter-course.pipe';
import { NewReleaseDirective } from './new-release.directive';
import { OrderByPipe } from './order-by.pipe';
import { DurationPipe } from '../course-list-item/duration.pipe';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of as observableOf, observable} from "rxjs";


describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let nativeComponent: HTMLElement;
  let fakeCourseService: jasmine.SpyObj<CourseService>;

  const fakeCourseList: Course[] = [   
    {
      id: 22,
      name: 'Genitive',
      date: new Date('Fri Oct 25 2019 13:11:19').toISOString(),
      length: 100,
      description: 'Genitive case.',
    },
    {
      id: 33,
      name: 'Accusative',
      date: new Date('Oct 2 2019 13:11:19').toISOString(),
      length: 90,
      description: 'Accusative case.',
    },
    {
      id: 44,
      name: 'Dative',
      date: new Date().toISOString(),
      length: 120,
      description: 'DagetListe case.',
      isTopRated: true,
    },
  ];

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['get', 'delete']);
    fakeCourseService.get.and.returnValue(observableOf(fakeCourseList));

    TestBed.configureTestingModule({
      declarations: [CourseListComponent, CourseListItemComponent, DurationPipe, NewReleaseDirective, OrderByPipe],
      imports: [FormsModule, RouterTestingModule,],
      providers: [
        {
          provide: CourseService,  useValue: fakeCourseService,
        },
        {
          provide: FilterCoursePipe, useClase: FilterCoursePipe,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeComponent = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course items', () => {
    const courses = nativeComponent.querySelectorAll('gmp-course-list-item');

    expect(fakeCourseService.get).toHaveBeenCalled();
    expect(courses).toBeDefined();
    expect(courses.length).toEqual(fakeCourseList.length);
  })

  it('should call remove when clicking delete item button', () => {
    const confirmSpy = spyOn(window, 'confirm');
    confirmSpy.and.returnValue(true);

    nativeComponent.querySelector<HTMLButtonElement>('#delete-item').click();

    expect(fakeCourseService.delete).toHaveBeenCalledWith(fakeCourseList[0].id);
  });

  it('should redirect to edit pages when clicking edit item button', () => {
    const routerSpy = spyOn(TestBed.get(Router), 'navigate');

    nativeComponent.querySelector<HTMLButtonElement>('#edit-item').click();

    expect(routerSpy).toHaveBeenCalledWith(['courses', fakeCourseList[0].id]);
  });

  it('should call get service when clicking Load more bar', () => {
    const consoleSpy = spyOn(console, 'log');

    nativeComponent.querySelector<HTMLDivElement>('#load-more').click();

    expect(fakeCourseService.get).toHaveBeenCalledWith(0, 10, '');
  });

  it('should show no data bar for empty course list', () => {
    fakeCourseService.get.and.returnValue(observableOf([]));

    component.filter = '';

    expect(nativeComponent.querySelector<HTMLDivElement>('#empty-courses')).toBeDefined();
  });

  it('should call get service with filter string', () => {
    component.filter = 'genitive';

    fixture.detectChanges();

    expect(fakeCourseService.get).toHaveBeenCalledWith(0, 5, 'genitive');
  });

  it('should show sorted courses', () => {
    const courses = nativeComponent.querySelectorAll<HTMLDivElement>('.title');

    expect(courses[0].innerText).toContain('DATIVE'); // creationDate: new Date()
    expect(courses[2].innerText).toContain('ACCUSATIVE'); // creationDate: new Date('Oct 2 2019 13:11:19')
  });

  it('should render one new release course', () => {
    const courses = fixture.debugElement.queryAll(By.directive(NewReleaseDirective));
    
    const freshcourse = courses.filter(course => course.childNodes[0].nativeNode.style.border === '5px solid green');
  
    expect(freshcourse.length).toBe(1);
  });

  it('should render one top rated course', () => {
    expect(nativeComponent.querySelectorAll<HTMLDivElement>('.top-rated').length).toBe(1);
  });
});
