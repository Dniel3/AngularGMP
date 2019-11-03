import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let nativeComponent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListComponent, CourseListItemComponent],
      imports: [FormsModule,]
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
    expect(nativeComponent.querySelectorAll('gmp-course-list-item')).toBeDefined();
  })

  it('should call remove when clicking delete item button', () => {
    const consoleSpy = spyOn(console, 'log');

    nativeComponent.querySelector<HTMLButtonElement>('#delete-item').click();

    expect(consoleSpy).toHaveBeenCalledWith('Parent delete:', '1');
  });

  it('should log text when clicking Load more bar', () => {
    const consoleSpy = spyOn(console, 'log');

    nativeComponent.querySelector<HTMLDivElement>('#load-more').click();

    expect(consoleSpy).toHaveBeenCalledWith('Load more');
  });
});
