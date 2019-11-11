import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageComponent } from './course-page.component';
import { SectionComponent } from '../section/section.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from '../course-list/order-by.pipe';
import { NewReleaseDirective } from '../course-list/new-release.directive';
import { DurationPipe } from '../course-list-item/duration.pipe';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursePageComponent,
        CourseListComponent,
        CourseListItemComponent,
        DurationPipe,
        OrderByPipe,
        NewReleaseDirective,
        SectionComponent,
      ],
      imports: [FormsModule,],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
