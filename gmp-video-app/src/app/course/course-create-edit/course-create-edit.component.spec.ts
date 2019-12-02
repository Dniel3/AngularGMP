import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateEditComponent } from './course-create-edit.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../course-list-item/duration.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/course-model';

describe('CourseCreateEditComponent', () => {
  let component: CourseCreateEditComponent;
  let fixture: ComponentFixture<CourseCreateEditComponent>;
  let routerSpy: jasmine.Spy;
  let fakeCourseService: jasmine.SpyObj<CourseService>;
  const fakeCourse: Course = {
    id: '1',
    title: 'fakeTitle',
    duration: 1,
    creationDate: new Date(),
    description: 'foo'
  };

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['create', 'update', 'getById']);
    TestBed.configureTestingModule({
      declarations: [CourseCreateEditComponent, DurationPipe,],
      imports: [FormsModule, RouterTestingModule],
      providers: [
        {
          provide: CourseService, useValue: fakeCourseService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    routerSpy = spyOn(TestBed.get(Router), 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to courses page when clicking cancel', () => {
    fixture.nativeElement.querySelector('.cancel').click();

    expect(routerSpy).toHaveBeenCalledWith(['courses']);
  });

  it('should redirect to courses page when clicking save', () => {
    fixture.nativeElement.querySelector('.save').click();

    expect(routerSpy).toHaveBeenCalledWith(['courses']);
  });

  it('should create new courses when clicking save', () => {
    fakeCourseService.create.and.returnValue();

    fixture.nativeElement.querySelector('.save').click();

    expect(fakeCourseService.create).toHaveBeenCalled();
  });

  it('should update courses when clicking save', () => {
    fakeCourseService.getById.and.returnValue(fakeCourse);
    fakeCourseService.update.and.returnValue();
    TestBed.get(ActivatedRoute).params.next({ 'id': '9' });

    fixture.nativeElement.querySelector('.save').click();

    expect(fakeCourseService.update).toHaveBeenCalled();
  });
});
