import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../core/course-model';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], order?: string): Course[] {
    return order && order === 'ASC' ?
      courses.sort((c1, c2) => { return c1.creationDate.getTime() - c2.creationDate.getTime() }) :
      courses.sort((c1, c2) => { return c2.creationDate.getTime() - c1.creationDate.getTime() });
  }
}
