import { Component, ViewChild } from '@angular/core';
import { CourseDateComponent } from '../course-date/course-date.component';
import { CourseDurationComponent } from '../course-duration/course-duration.component';
import { CourseAuthorComponent } from '../course-author/course-author.component';

@Component({
  selector: 'gmp-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  title = '';
  description = '';
  @ViewChild(CourseDurationComponent, {static:false})
  duration: HTMLElement|undefined;

  @ViewChild(CourseDateComponent, {static:false})
  creationDate: CourseDateComponent|undefined;

  @ViewChild(CourseAuthorComponent, {static:false})
  authors: HTMLElement|undefined;

  constructor() { }

  cancel() {
  }

  save() {
  }
}
