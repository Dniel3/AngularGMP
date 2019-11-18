import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let fakeUserService: jasmine.SpyObj<UserService>;


  beforeEach(async(() => {
    fakeUserService = jasmine.createSpyObj('UserService', ['login']);
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [FormsModule,],
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
    fixture.nativeElement.querySelector('button').click();
    
    expect(fakeUserService.login).toHaveBeenCalled();
  });

});
