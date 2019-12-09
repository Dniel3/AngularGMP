import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { UserService } from '../../services/user.service';
import { User, Name } from '../model/user-model';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of as observableOf } from "rxjs";


describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let nativeComponent: HTMLElement;
  let fakeUserService: jasmine.SpyObj<UserService>;
  const fakeUser: User = {
    id: '1',
    name: {
      first: 'Yuval',
      last: 'Noah',
    } as Name,
    login: '',
    password: '',
  };

  beforeEach(async(() => {
    fakeUserService = jasmine.createSpyObj('UserService', ['logout', 'isLoggedIn', 'getUser']);
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useValue: fakeUserService },],
    }).compileComponents();
    fakeUserService.isLoggedIn.and.returnValue(false);
    fakeUserService.getUser.and.returnValue(observableOf(fakeUser));
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

  it('should render logo', () => {
    expect(nativeComponent.querySelector('gmp-logo')).toBeDefined();
  });

  it('should not display user info for unathenticated user', () => {
    expect(nativeComponent.querySelector('.user-login-container')).toBe(null);
  });

  describe("Authenticated user", () => {
    beforeEach(() => {
      fakeUserService.isLoggedIn.and.returnValue(true);
      fixture.detectChanges();
    });

    it('should render user name', () => {
      expect(nativeComponent.querySelector('.user-login').textContent).toContain(`Welcome ${fakeUser.name.first}`);
    });

    it('should render logout button', () => {
      expect(nativeComponent.querySelector('.log-off')).toBeDefined();
    });

    it('should call logout servide', () => {
      nativeComponent.querySelector<HTMLDivElement>('#log-out-container').click();

      expect(fakeUserService.logout).toHaveBeenCalled();
    })

    it('should redirect to login page when clicking logout', () => {
      const routerSpy = spyOn(TestBed.get(Router), 'navigate');

      nativeComponent.querySelector<HTMLDivElement>('#log-out-container').click();

      expect(routerSpy).toHaveBeenCalledWith(['login']);
    })
  });
});
