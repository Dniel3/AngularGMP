import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { LoginModule } from './login/login.module';
import { AppRoutingModule } from './app-routing.module';
import { CourseModule } from './course/course.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './admin/admin.module';

describe('AuthGuard', () => {
  let fakeUserService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    fakeUserService = jasmine.createSpyObj('UserService', ['isLoggedIn']);
    TestBed.configureTestingModule({
      imports: [
        AdminModule,
        CourseModule,
        CoreModule,
        LoginModule,
        AppRoutingModule, 
        RouterTestingModule
      ],
      providers: [AuthGuard, { provide: UserService, useValue: fakeUserService },],
    });
    fakeUserService.isLoggedIn.and.returnValue(true);
  });

  it('should exist', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should activate', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard.canActivate()).toBe(true);
  }));

  it('should not activate', inject([AuthGuard], (guard: AuthGuard) => {
    const routerSpy = spyOn(TestBed.get(Router), 'parseUrl');
    routerSpy.and.returnValue(false);
    fakeUserService.isLoggedIn.and.returnValue(false);

    expect(guard.canActivate()).toBe(false);
    expect(routerSpy).toHaveBeenCalledWith('/login');
  }));
});
