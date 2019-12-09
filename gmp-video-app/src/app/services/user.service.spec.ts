import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { UserService } from './user.service';
import { Login } from '../core/model/login-model';
import { User } from '../core/model/user-model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const login: Login = { 
    login: '',
    password:'',
   };
   const loginUrl = 'http://localhost:3004/auth/login'
   const userUrl = 'http://localhost:3004/auth/userinfo'
   const fakeToken =  { token: 'tokendance'};


  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user', () => {
    localStorage.setItem('token', 'test');
    const fakeUser: User = {
      id: 'd',
      name: {
        first: 'foo',
        last: 'barz',
      },
      login: 'faz',
      password: '',
    };

    service.get()

    service.getUser().subscribe(user => {
      expect(user).toBeDefined(fakeUser);
    });

    const req = httpMock.expectOne(userUrl);
    req.flush(fakeUser);
  });

  it('should load info to local storage', () => {
    service.login(login).subscribe(token => {
      expect(token).toBe(fakeToken);
      expect(localStorage.getItem('token')).toBeDefined();
    });

    const req = httpMock.expectOne(loginUrl);
    req.flush(fakeToken);
  });

  it('should remove info from local storage', () => {
    service.login(login).subscribe();

    const req = httpMock.expectOne(loginUrl);
    req.flush(fakeToken);

    service.logout();

    expect(localStorage.getItem('token')).toBe(null);
  });

  it('should not be loggedIn', () => {
    service.logout();

    expect(service.isLoggedIn()).toBe(false);
  });

  it('should be loggedIn', () => {
    service.login(login).subscribe(token => {
      localStorage.setItem('token', token.token);
      expect(service.isLoggedIn()).toBe(true);
    });

    const req = httpMock.expectOne(loginUrl);
    req.flush(fakeToken);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
