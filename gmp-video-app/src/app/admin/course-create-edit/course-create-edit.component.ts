import { Component, ViewChild } from '@angular/core';
import { CourseDateComponent } from '../course-date/course-date.component';
import { CourseDurationComponent } from '../course-duration/course-duration.component';
import { CourseAuthorComponent } from '../course-author/course-author.component';
import { Course } from 'src/app/core/course-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'gmp-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  title = '';
  course: Course | undefined = undefined;
  description = '';
  private duration: CourseDurationComponent | undefined;
  private creationDate: CourseDateComponent | undefined;

  @ViewChild(CourseDurationComponent, { static: false })
  set durationComponent(duration: CourseDurationComponent) {
    if (duration) {
      this.duration = duration;
      if (this.course) {
        this.duration.duration = this.course.duration;
      }
    }
  }

  @ViewChild(CourseDateComponent, { static: false })
  set creationDateComponent(date: CourseDateComponent) {
    if (date) {
      this.creationDate = date;
      if (this.course) {
        this.creationDate.creationDate = this.course.creationDate;
      }
    }
  }

  @ViewChild(CourseAuthorComponent, { static: false })
  private authors: CourseAuthorComponent | undefined

  constructor(private readonly courseService: CourseService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      this.course = this.courseService.getById(params['id']);
      if (this.course) {
        this.title = this.course.title;
        this.description = this.course.description;
      }
    });
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  save() {
    const isEditing = Boolean(this.course);
    this.course = {
      id: isEditing ? this.course.id : Date.now().toString(),
      title: this.title,
      description: this.description,
      duration: this.duration.duration,
      creationDate: new Date(this.creationDate.creationDate),
      topRated: isEditing ? this.course.topRated : undefined,
    };

    isEditing ? this.courseService.update(this.course) : this.courseService.create(this.course);

    this.router.navigate(['courses']);
  }
}
