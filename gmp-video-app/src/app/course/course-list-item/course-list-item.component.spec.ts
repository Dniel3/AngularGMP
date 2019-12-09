import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListItemComponent } from './course-list-item.component';
import { Course } from '../../core/model/course-model';
import { Component } from '@angular/core';
import { DurationPipe } from './duration.pipe';
import { By } from '@angular/platform-browser';

@Component({
  template: `
     <gmp-course-list-item [course]="course" (remove)="remove($event)" (edit)="edit($event)">
     </gmp-course-list-item>
  `,
})
class ItemHost {
  course: Course = {
    id: 1,
    date: new Date('Oct 2 2019 13:11:19').toISOString(),
    length: 90,
    description: 'fake description',
    name: 'fake title',
  };

  remove(id: string) {
    console.log('deleted', this.course.id);
  }

  edit(id: string) {
    console.log('edited', this.course.id);
  }
}

describe('CourseListItemComponentHosted', () => {
  let component: ItemHost;
  let fixture: ComponentFixture<ItemHost>;
  let itemComponent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListItemComponent, ItemHost, DurationPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
    itemComponent = fixture.nativeElement.querySelector('gmp-course-list-item');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course information', () => {
    expect(itemComponent.querySelector('.title').textContent).toBe(component.course.name.toUpperCase());
    expect(itemComponent.querySelector('#course-duration').textContent).toBe('1 h 30 min');
    expect(itemComponent.querySelector('#course-date').textContent).toBe('Oct 2, 2019');
    expect(itemComponent.querySelector('#course-description').textContent).toBe(component.course.description);
  });

  it('should deleted id when clicking delete button', () => {
    const consoleSpy = spyOn(console, 'log');

    itemComponent.querySelector<HTMLButtonElement>('#delete-item').click();

    expect(consoleSpy).toHaveBeenCalledWith('deleted', component.course.id);
  });

  it('should edit when clicking edit button', () => {
    const consoleSpy = spyOn(console, 'log');

    itemComponent.querySelector<HTMLButtonElement>('#edit-item').click();

    expect(consoleSpy).toHaveBeenCalledWith('edited', component.course.id);
  });
});

describe('CourseListItemComponent', () => {
  let component: CourseListItemComponent;
  let fixture: ComponentFixture<CourseListItemComponent>;
  let nativeElement: HTMLElement;
  const fakeCourse: Course = {
    id: 1,
    date: new Date('Oct 2 2019').toISOString(),
    length: 90,
    description: 'fake description',
    name: 'fake title',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListItemComponent, DurationPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListItemComponent);
    component = fixture.componentInstance;
    component.course = fakeCourse;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course information', () => {
    expect(nativeElement.querySelector('.title').textContent).toBe(fakeCourse.name.toUpperCase());
    expect(nativeElement.querySelector('#course-duration').textContent).toBe('1 h 30 min');
    expect(nativeElement.querySelector('#course-date').textContent).toBe('Oct 2, 2019');
    expect(nativeElement.querySelector('#course-description').textContent).toBe(fakeCourse.description);
  });

  it('should emit id when clicking delete button', () => {
    let expectedId: number;
    component.remove.subscribe((id: number) => { expectedId = id; });

    nativeElement.querySelector<HTMLButtonElement>('#delete-item').click();

    expect(expectedId).toBe(fakeCourse.id);
  });

  it('should emit id when clicking edit button', () => {
    let expectedId: number;
    component.edit.subscribe((id: number) => { expectedId = id; });

    nativeElement.querySelector<HTMLButtonElement>('#edit-item').click();

    expect(expectedId).toBe(fakeCourse.id);
  });

  it('should render and change color for top rated course', () => {
    component.course.isTopRated = true;

    fixture.detectChanges();

    expect(nativeElement.querySelector('.top-rated')).toBeDefined();
    expect(nativeElement.querySelector('#top-rated')).toBeDefined();
  });
});

describe('CourseListItemClass', () => {
  let componentInstance: CourseListItemComponent;

  beforeEach(() => {
    componentInstance = new CourseListItemComponent();
  });

  it('should create', () => {
    expect(componentInstance).toBeTruthy();
  });
});
