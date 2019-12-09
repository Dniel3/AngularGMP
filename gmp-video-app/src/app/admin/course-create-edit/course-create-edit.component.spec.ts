import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateEditComponent } from './course-create-edit.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from '../../course/course-list-item/duration.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/model/course-model';
import { CourseAuthorComponent } from '../course-author/course-author.component';
import { CourseDateComponent } from '../course-date/course-date.component';
import { CourseDurationComponent } from '../course-duration/course-duration.component';
import { of as observableOf} from "rxjs";

describe('CourseCreateEditComponent', () => {
  let component: CourseCreateEditComponent;
  let fixture: ComponentFixture<CourseCreateEditComponent>;
  let routerSpy: jasmine.Spy;
  let fakeCourseService: jasmine.SpyObj<CourseService>;
  const fakeCourse: Course = {
    id: 1,
    name: 'fakeTitle',
    length: 1,
    date: new Date().toISOString(),
    description: 'foo'
  };

  beforeEach(async(() => {
    fakeCourseService = jasmine.createSpyObj('CourseService', ['create', 'update', 'getById']);
    TestBed.configureTestingModule({
      declarations: [
        CourseAuthorComponent,
        CourseDateComponent,
        CourseDurationComponent,
        CourseCreateEditComponent, 
        DurationPipe,
      ],
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
    routerSpy = spyOn(TestBed.get(Router), 'navigate');   
    TestBed.get(ActivatedRoute).params.next({ 'id': 'new' });
    fixture.detectChanges();

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
    fakeCourseService.create.and.returnValue(observableOf(fakeCourse));

    fixture.nativeElement.querySelector('.save').click();

    expect(fakeCourseService.create).toHaveBeenCalled();
  });

  it('should update courses when clicking save', () => {
    fakeCourseService.getById.and.returnValue(observableOf(fakeCourse));
    fakeCourseService.update.and.returnValue(observableOf(fakeCourse));
    TestBed.get(ActivatedRoute).params.next({ 'id': '9' });

    fixture.nativeElement.querySelector('.save').click();

    expect(fakeCourseService.update).toHaveBeenCalled();
  });
});
