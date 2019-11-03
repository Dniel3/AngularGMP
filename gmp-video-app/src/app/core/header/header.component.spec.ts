import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let nativeComponent: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeComponent = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user name', () => {
    expect(nativeComponent.querySelector('gmp-logo')).toBeDefined();
  });

  it('should render user name', () => {
    expect(nativeComponent.querySelector('.user-login').textContent).toBe(' Welcome cosme');
  });
});
