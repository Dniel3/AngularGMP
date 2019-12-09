import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../core/model/course-model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], order?: string): Course[] {
    return order && order === 'ASC' ?
      courses.sort((c1, c2) => { return new Date(c1.date).getTime() - new Date(c2.date).getTime() }) :
      courses.sort((c1, c2) => { return new Date(c2.date).getTime() - new Date(c1.date).getTime() });
  }
}
