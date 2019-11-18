import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursePageComponent } from './course/course-page/course-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';


const routes: Routes = [
  { path: 'courses', component: CoursePageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: '', redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: '**', redirectTo: '/courses',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
