import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDateComponent } from './course-date.component';
import { FormsModule } from '@angular/forms';

describe('CourseDateComponent', () => {
  let component: CourseDateComponent;
  let fixture: ComponentFixture<CourseDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseDateComponent],
      imports: [FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
