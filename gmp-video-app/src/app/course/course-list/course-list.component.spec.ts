import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/course-model';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let nativeComponent: HTMLElement;
  let fakeCourseService: jasmine.SpyObj<CourseService>;

  const fakeCourseList: Course[] = [   
  {
    id: '21',
    title: 'Dative',
    creationDate: 1,
    duration: 120,
    description: 'Dative case.',
  },
  {
    id: '22',
    title: 'Genitive',
    creationDate: 22,
    duration: 100,
    description: 'Genitive case.',
  },
  {
    id: '32',
    title: 'Accusative',
    creationDate: 87,
    duration: 90,
    description: 'Accusative case.',
  },];

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['get']);
    fakeCourseService.get.and.returnValue(fakeCourseList);

    TestBed.configureTestingModule({
      declarations: [CourseListComponent, CourseListItemComponent],
      imports: [FormsModule,],
      providers: [
        {
          provide: CourseService,  useValue: fakeCourseService
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
});
