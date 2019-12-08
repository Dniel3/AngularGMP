import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursePageComponent } from './course/course-page/course-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { CourseCreateEditComponent } from './admin/course-create-edit/course-create-edit.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full'
  },
  {
    path: 'courses', 
    component: CoursePageComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'courses',
    },
  },
  { path: 'courses/:id', 
    component: CourseCreateEditComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'courses',
    },
  },
  { 
    path: 'login', 
    component: LoginPageComponent,
    data: {
      breadcrumb: 'not found',
    },
  },
  {
    path: '**', component: NotFoundPageComponent,
    data: {
      breadcrumb: 'not found',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
