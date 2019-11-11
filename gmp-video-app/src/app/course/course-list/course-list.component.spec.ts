import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/course-model';
import { FilterCoursePipe } from './filter-course.pipe';
import { NewReleaseDirective } from './new-release.directive';
import { OrderByPipe } from './order-by.pipe';
import { DurationPipe } from '../course-list-item/duration.pipe';
import { By } from '@angular/platform-browser';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let nativeComponent: HTMLElement;
  let fakeCourseService: jasmine.SpyObj<CourseService>;

  const fakeCourseList: Course[] = [   
    {
      id: '22',
      title: 'Genitive',
      creationDate: new Date('Fri Oct 25 2019 13:11:19'),
      duration: 100,
      description: 'Genitive case.',
    },
    {
      id: 'oldest',
      title: 'Accusative',
      creationDate: new Date('Oct 2 2019 13:11:19'),
      duration: 90,
      description: 'Accusative case.',
    },
    {
      id: 'newest',
      title: 'Dative',
      creationDate: new Date(),
      duration: 120,
      description: 'Dative case.',
      topRated: true,
    },
  ];

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['get']);
    fakeCourseService.get.and.returnValue(fakeCourseList);

    TestBed.configureTestingModule({
      declarations: [CourseListComponent, CourseListItemComponent, DurationPipe, NewReleaseDirective, OrderByPipe],
      imports: [FormsModule,],
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
    const consoleSpy = spyOn(console, 'log');

    nativeComponent.querySelector<HTMLButtonElement>('#delete-item').click();

    expect(consoleSpy).toHaveBeenCalledWith('Parent delete:', fakeCourseList[0].id);
  });

  it('should log text when clicking Load more bar', () => {
    const consoleSpy = spyOn(console, 'log');

    nativeComponent.querySelector<HTMLDivElement>('#load-more').click();

    expect(consoleSpy).toHaveBeenCalledWith('Load more');
  });

  it('should show no data bar for empty course list', () => {
    fakeCourseService.get.and.returnValue([]);

    component.ngOnInit();

    expect(nativeComponent.querySelector<HTMLDivElement>('#empty-courses')).toBeDefined();
  });

  it('should show filtered course', () => {
    component.filter = 'genitive';

    fixture.detectChanges();

    expect(nativeComponent.querySelectorAll<HTMLDivElement>('gmp-course-list-item').length).toBe(1);
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
