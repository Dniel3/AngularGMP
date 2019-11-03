import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePageComponent } from './course-page.component';
import { SectionComponent } from '../section/section.component';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';

describe('CoursePageComponent', () => {
  let component: CoursePageComponent;
  let fixture: ComponentFixture<CoursePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursePageComponent,
        CourseListComponent,
        CourseListItemComponent,
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
