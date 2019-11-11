import { NewReleaseDirective } from "./new-release.directive";
import { ElementRef, Component } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CourseListItemComponent } from '../course-list-item/course-list-item.component';
import { Course } from '../../core/course-model';
import { DurationPipe } from '../course-list-item/duration.pipe';
import { By } from '@angular/platform-browser';

@Component({
  template: `
     <gmp-course-list-item [course]="course" [gmpNewRelease]="course.creationDate" (remove)="remove($event)">
     </gmp-course-list-item>
  `,
})
class ItemHost {
  course: Course = {
    id: '1',
    creationDate: new Date(),
    duration: 90,
    description: 'fake description',
    title: 'fake title',
  };
}

describe('NewReleaseDirective', () => {
  let component: ItemHost;
  let fixture: ComponentFixture<ItemHost>;
  let itemComponent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListItemComponent, ItemHost, DurationPipe, NewReleaseDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
    itemComponent = fixture.nativeElement.querySelector('gmp-course-list-item');
  });
  
  it('should create an instance', () => {
    const directive = new NewReleaseDirective({} as ElementRef);
    expect(directive).toBeTruthy();
  });

  it('should render new realease course', () => {
    const course = fixture.debugElement.query(By.directive(NewReleaseDirective));

    expect(course.childNodes[0].nativeNode.style.border).toBe('5px solid green');
  });

  it('should render non styled course', () => {
    const course = fixture.debugElement.query(By.directive(NewReleaseDirective));
    component.course.creationDate = new Date('Oct 1 2000 11:00:00');

    fixture.detectChanges();

    expect(course.childNodes[0].nativeNode.style.border).not.toBe('5px solid green');
  });
});
