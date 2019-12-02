import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionComponent } from './section.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('SectionComponent', () => {
  let component: SectionComponent;
  let fixture: ComponentFixture<SectionComponent>;
  let nativeComponent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SectionComponent],
      imports: [FormsModule, RouterTestingModule,]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeComponent = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update component model', () => {
    const input = nativeComponent.querySelector<HTMLInputElement>('input');
    const searchTest = "kalinka";
    input.value = searchTest;

    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.course).toBe(searchTest);
  });

  it('should log course when clicking button', () => {
    const consoleSpy = spyOn(console, 'log');
    const course = 'moloko';
    component.course = course;
    
    nativeComponent.querySelector<HTMLButtonElement>('button').click();

    expect(consoleSpy).toHaveBeenCalledWith(course);
  });

  it('should emit search string when clicking button', () => {
    const input = nativeComponent.querySelector<HTMLInputElement>('input');
    const searchTest = "kalinka";
    input.value = searchTest;
    let expectedText;
    component.search.subscribe((input) => {expectedText = input;})

    input.dispatchEvent(new Event('input'));
    nativeComponent.querySelector<HTMLButtonElement>('button').click();
    fixture.detectChanges();

    expect(expectedText).toContain(searchTest);
  });

  it('should redirect to create course page when clicking add', () => {
    const routerSpy = spyOn(TestBed.get(Router), 'navigate');

    nativeComponent.querySelector<HTMLButtonElement>('.add-action button').click();

    expect(routerSpy).toHaveBeenCalledWith(['courses', 'new']);
  });
});
