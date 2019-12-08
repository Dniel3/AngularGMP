import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumComponent } from './breadcrum.component';
import { CourseService } from '../../services/course.service';
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

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['getById']);
    fakeCourseService.getById.and.returnValue(fakeCourse);
    TestBed.configureTestingModule({
      declarations: [BreadcrumComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: CourseService, useValue: fakeCourseService
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
