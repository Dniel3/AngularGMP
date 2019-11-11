import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../core/course-model';

@Pipe({
  name: 'filterCourse'
})
export class FilterCoursePipe implements PipeTransform {

  transform(courses: Course[], filter: string = ''): Course[] {
    return courses.filter(course => course.title.toLowerCase().includes(filter.toLowerCase()));;
  }

}
