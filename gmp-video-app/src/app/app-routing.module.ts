import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursePageComponent } from './course/course-page/course-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { CourseCreateEditComponent } from './course/course-create-edit/course-create-edit.component';
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
  },
  { path: 'courses/:id', 
    component: CourseCreateEditComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: '**', component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
