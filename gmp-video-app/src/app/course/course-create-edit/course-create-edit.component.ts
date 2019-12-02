import { Component } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from '../../core/course-model';

@Component({
  selector: 'gmp-course-create-edit',
  templateUrl: './course-create-edit.component.html',
  styleUrls: ['./course-create-edit.component.scss']
})
export class CourseCreateEditComponent {
  title = '';
  description = '';
  duration: number|undefined;
  creationDate: Date|undefined;
  authors = '';
  course: Course|undefined = undefined;
  
  constructor(private readonly courseService: CourseService,
      private readonly router: Router, 
      activatedRoute: ActivatedRoute) {
        activatedRoute.params.subscribe(params => {
          this.course = this.courseService.getById(params['id']);
          if(this.course) {
            this.title = this.course.title;
            this.description = this.course.description;
            this.duration = this.course.duration;
            this.creationDate = this.course.creationDate;
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
     duration: this.duration,
     creationDate: new Date(this.creationDate),
    };

    isEditing ? this.courseService.update(this.course) : this.courseService.create(this.course);
    
    this.router.navigate(['courses']);
  }
}
