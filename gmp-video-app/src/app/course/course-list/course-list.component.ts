import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../core/course-model';
import { BehaviorSubject } from 'rxjs';
import { FilterCoursePipe } from './filter-course.pipe';

@Component({
  selector: 'gmp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
  providers: [FilterCoursePipe]
})
export class CourseListComponent implements OnInit {
  
  courses: Course[] = [];
  
  @Input()
  set filter(filter: string) {
    this.courses = this.filterPipe.transform(this.courseService.get(), filter);
  } 
  
  constructor(private readonly courseService: CourseService, 
      private readonly filterPipe: FilterCoursePipe) {
   }

  ngOnInit() {
    this.courses = this.courseService.get();
  }

  remove(id: string) {
    if(window.confirm("Do you reallu want to delete this course?")) {
      this.courseService.delete(id);
      this.courses = this.courseService.get();
    }
  }

  loadMore() {
    console.log('Load more');
  }
}
