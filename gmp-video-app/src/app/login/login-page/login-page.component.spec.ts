import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let fakeUserService: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    fakeUserService = jasmine.createSpyObj('UserService', ['login']);
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [FormsModule, RouterTestingModule],
      providers: [{provide: UserService, useValue: fakeUserService},],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user', () => {
    const routerSpy = spyOn(TestBed.get(Router), 'navigate');

    fixture.nativeElement.querySelector('button').click();
    
    expect(fakeUserService.login).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['courses']);
  });
});
