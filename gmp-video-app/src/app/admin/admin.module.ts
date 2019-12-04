import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDurationComponent } from './course-duration/course-duration.component';
import { CourseDateComponent } from './course-date/course-date.component';
import { CourseAuthorComponent } from './course-author/course-author.component';
import { CourseCreateEditComponent } from './course-create-edit/course-create-edit.component';
import { FormsModule } from '@angular/forms';
import { CourseModule } from '../course/course.module';



@NgModule({
  declarations: [CourseCreateEditComponent, CourseDurationComponent, CourseDateComponent, CourseAuthorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CourseModule,
  ],
  exports: [CourseCreateEditComponent]
})
export class AdminModule { }
