import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/core/course-model';

@Component({
  selector: 'gmp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[] = [];
  
  constructor(private courseService: CourseService) {
   }

  ngOnInit() {
    this.courses = this.courseService.get();
  }

  remove(id: string) {
    console.log('Parent delete:', id);
  }

  loadMore() {
    console.log('Load more');
  }
}
