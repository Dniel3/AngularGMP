import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user', () => {
    expect(service.get()).toBeDefined();
  });

  it('should load info to local storage', () => {
    service.login();

    expect(localStorage.getItem('user')).toBeDefined();
    expect(localStorage.getItem('lastName')).toBeDefined();
    expect(localStorage.getItem('id')).toBeDefined();
    expect(localStorage.getItem('token')).toBeDefined();
  });

  it('should remove info from local storage', () => {
    service.login();

    service.logout();

    expect(localStorage.removeItem('user')).not.toBeDefined();
    expect(localStorage.removeItem('lastName')).not.toBeDefined();
    expect(localStorage.removeItem('id')).not.toBeDefined();
    expect(localStorage.removeItem('token')).not.toBeDefined();
  });

  it('should not be loggedIn', () => {
    service.logout();

    expect(service.isLoggedIn()).toBe(false);
  });

  it('should be loggedIn', () => {
    service.login();

    expect(service.isLoggedIn()).toBe(true);
  });
});
