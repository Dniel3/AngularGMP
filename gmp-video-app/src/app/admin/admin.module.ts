import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDurationComponent } from './course-duration/course-duration.component';
import { CourseDateComponent } from './course-date/course-date.component';
import { CourseAuthorComponent } from './course-author/course-author.component';
import { CourseCreateEditComponent } from './course-create-edit/course-create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseModule } from '../course/course.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [CourseCreateEditComponent, CourseDurationComponent, CourseDateComponent, CourseAuthorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CourseModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSelectModule,
    MatIconModule,
  ],
  exports: [CourseCreateEditComponent],
  entryComponents: [CourseAuthorComponent]
})
export class AdminModule { }
