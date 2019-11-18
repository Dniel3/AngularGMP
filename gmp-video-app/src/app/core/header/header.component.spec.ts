import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { UserService } from '../../services/user.service';
import { User } from '../user-model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let nativeComponent: HTMLElement;
  let fakeUserService: jasmine.SpyObj<UserService>;
  const fakeUser: User = {
    id: '1',
    name: 'Yuval',
    lastName: 'Noah',
  };

  beforeEach(async(() => {
    fakeUserService = jasmine.createSpyObj('UserService', ['logout', 'isLoggedIn', 'get']);
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, LogoComponent],
      providers: [{provide: UserService, useValue: fakeUserService},],
    }).compileComponents();
    fakeUserService.isLoggedIn.and.returnValue(false);
    fakeUserService.get.and.returnValue(fakeUser);
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
      expect(nativeComponent.querySelector('.user-login').textContent).toContain(`Welcome ${fakeUser.name}`);
    });

    it('should render logot button', () => {
      expect(nativeComponent.querySelector('.log-off')).toBeDefined();
    });

    it('should call logout servide', () => {
      nativeComponent.querySelector<HTMLDivElement>('#log-out-container').click();

      expect(fakeUserService.logout).toHaveBeenCalled();
    })
  });
});
