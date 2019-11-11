import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../../core/course-model';

@Pipe({
  name: 'durationFormat',
  pure: true,
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    const minutes = duration % 60;
    if(duration < 60) {
      return `${minutes} min`;
    }

    const hours = (duration - minutes) / 60;
    return `${hours} h ${minutes} min`;
  }

}
