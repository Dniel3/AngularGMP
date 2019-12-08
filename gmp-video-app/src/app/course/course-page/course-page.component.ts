import { Component } from '@angular/core';

@Component({
  selector: 'gmp-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent {
  search = '';

  searchCourse(course: string) {
    this.search = course;
  }
}
