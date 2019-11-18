import { NewReleaseDirective } from "./new-release.directive";
import { ElementRef, Component, Renderer2, Type } from '@angular/core';
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
  let render2: Renderer2;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourseListItemComponent, ItemHost, DurationPipe, NewReleaseDirective],
      providers: [Renderer2],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemHost);
    component = fixture.componentInstance;
    fixture.detectChanges();
    render2 = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
  });
  
  it('should create an instance', () => {
    const directive = new NewReleaseDirective({} as ElementRef, render2);
    expect(directive).toBeTruthy();
  });

  it('should render new realease course', () => {
    const course = fixture.debugElement.query(By.directive(NewReleaseDirective));

    expect(course.childNodes[0].nativeNode.style.border).toBe('5px solid green');
  });

  it('should render upcomming course', () => {
    const course = fixture.debugElement.query(By.directive(NewReleaseDirective));
    const greaterDate = new Date();
    greaterDate.setDate(greaterDate.getDate() + 14);
    component.course.creationDate = greaterDate;

    fixture.detectChanges();

    expect(course.childNodes[0].nativeNode.style.border).toBe('5px solid blue');
  });

  it('should render non styled course', () => {
    const course = fixture.debugElement.query(By.directive(NewReleaseDirective));
    component.course.creationDate = new Date('Oct 1 2000 11:00:00');

    fixture.detectChanges();

    expect(course.childNodes[0].nativeNode.style.border).not.toBe('5px solid green');
  });
});
