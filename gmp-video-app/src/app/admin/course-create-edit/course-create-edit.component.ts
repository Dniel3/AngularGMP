import { Component } from '@angular/core';
import { Course } from '../../core/model/course-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { switchMap, filter } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorsService } from '../../services/authors.service';
import { Observable } from 'rxjs';
import { Author } from '../../core/model/author-model';

@Component({
  selector: 'gmp-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  title = '';
  course: Course | undefined = undefined;
  description = '';
  readonly authors$: Observable<Author[]>;

  form = new FormGroup({
    title: new FormControl('', [Validators.maxLength(50), Validators.required]),
    description: new FormControl('', [Validators.maxLength(500), Validators.required]),
    date: new FormControl('', [Validators.pattern('^([0-2][0-9]|(3)[0-1])(\\/)(((0)[0-9])|([0-9])|((1)[0-2]))(\\/)\\d{4}$'), Validators.required]),
    duration: new FormControl(0, [Validators.required]),
    author: new FormControl([], [Validators.required, Validators.minLength(1)])
  });

  constructor(private readonly courseService: CourseService,
    private readonly authorService: AuthorsService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute) {
    this.authors$ = this.authorService.getAuthors();

    activatedRoute.params.pipe(filter(params => params['id'] && params['id'] !== 'new'),
      switchMap(params =>
        this.courseService.getById(params['id'])
      )).subscribe(course => {
        this.course = course;
        if (this.course) {
          this.form.controls['title'].setValue(this.course.name);
          this.form.controls['description'].setValue(this.course.description);
          this.form.controls['date'].setValue(new Date(this.course.date).toLocaleDateString());
          this.form.controls['duration'].setValue(this.course.length); 
          this.form.controls['author'].setValue(this.course.authors);
        }
      });
  }

  cancel() {
    this.router.navigate(['courses']);
  }

  save() {
    const isEditing = Boolean(this.course);
    this.course = {
      id: isEditing ? this.course.id : Date.now().valueOf(),
      name: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      length: this.form.controls['duration'].value,
      date: this.form.controls['date'].value,
      authors: this.form.controls['author'].value,
      isTopRated: isEditing ? this.course.isTopRated : false,
    };

    isEditing ? this.courseService.update(this.course).subscribe(console.log) : this.courseService.create(this.course).subscribe(console.log);

    this.router.navigate(['courses']);
  }

  hasError(name: string): boolean {
    const control = this.form.controls[name];
    return control.touched && control.invalid;
  }
}
