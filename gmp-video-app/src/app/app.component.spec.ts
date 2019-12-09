import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let fakeUserService: jasmine.SpyObj<UserService>;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    fakeUserService = jasmine.createSpyObj('UserService', ['logout', 'isLoggedIn', 'get', 'getUser']);
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [{provide: UserService, useValue: fakeUserService},],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fakeUserService.isLoggedIn.and.returnValue(true);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gmp-video-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('gmp-video-app');
  });

  it('should show breadcrum for auth user', () => {
    expect(fixture.nativeElement.querySelector('gmp-breadcrum')).toBeDefined();
  });

  it('should not show breadcrum for auth user', () => {
    fakeUserService.isLoggedIn.and.returnValue(false);

    expect(fixture.nativeElement.querySelector('gmp-breadcrum')).toBe(null);
  });
});
