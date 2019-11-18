import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'gmp-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent {
  private search = '';

  constructor() { }

  searchCourse(course: string) {
    this.search = course;
  }

}
