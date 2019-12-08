import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAuthorComponent } from './course-author.component';
import { FormsModule } from '@angular/forms';

describe('CourseAuthorComponent', () => {
  let component: CourseAuthorComponent;
  let fixture: ComponentFixture<CourseAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseAuthorComponent],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
