import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseModule } from './course/course.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { AdminModule } from './admin/admin.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptors/auth-interceptor';
import { LoadingInterceptor } from './services/interceptors/loading-interceptor';
import { StoreModule } from '@ngrx/store';
import { CourseReducer } from './state/course/course-reducer';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffects } from './state/course/course-effects';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    AppRoutingModule,
    CoreModule,
    CourseModule,
    BrowserAnimationsModule,
    LoginModule,
    AppRoutingModule,
    StoreModule.forRoot({courses: CourseReducer}),
    EffectsModule.forRoot([CourseEffects]),
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
