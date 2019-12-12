import { Component, ViewChild } from '@angular/core';
import { CourseDateComponent } from '../course-date/course-date.component';
import { CourseDurationComponent } from '../course-duration/course-duration.component';
import { CourseAuthorComponent } from '../course-author/course-author.component';
import { Course } from '../../core/model/course-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { switchMap, filter } from 'rxjs/operators';

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
    }
  }

  @ViewChild(CourseDateComponent, { static: false })
  set creationDateComponent(date: CourseDateComponent) {
    if (date) {
      this.creationDate = date;
    }
  }

  @ViewChild(CourseAuthorComponent, { static: false })
  private authors: CourseAuthorComponent | undefined

  constructor(private readonly courseService: CourseService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute) {
    activatedRoute.params.pipe(filter(params => params['id'] && params['id'] !== 'new'),
      switchMap(params =>
        this.courseService.getById(params['id'])
      )).subscribe(course => {
        this.course = course;
        if (this.course) {
          this.title = this.course.name;
          this.description = this.course.description;
          this.setChildComponents();
        }
      });
  }

  private setChildComponents() {
    this.creationDate.creationDate = this.course.date;
    this.duration.duration = this.course.length;
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  save() {
    const isEditing = Boolean(this.course);
    this.course = {
      id: isEditing ? this.course.id : Date.now().valueOf(),
      name: this.title,
      description: this.description,
      length: this.duration.duration,
      date: this.creationDate.creationDate,
      authors: isEditing ? this.course.authors : [],
      isTopRated: isEditing ? this.course.isTopRated : false,
    };

    isEditing ? this.courseService.update(this.course).subscribe(console.log) : this.courseService.create(this.course).subscribe(console.log);

    this.router.navigate(['courses']);
  }
}
