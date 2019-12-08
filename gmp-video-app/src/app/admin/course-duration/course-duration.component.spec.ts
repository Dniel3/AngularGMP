import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDurationComponent } from './course-duration.component';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from 'src/app/course/course-list-item/duration.pipe';

describe('CourseDurationComponent', () => {
  let component: CourseDurationComponent;
  let fixture: ComponentFixture<CourseDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDurationComponent, DurationPipe],
      imports: [FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
