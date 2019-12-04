import { Component } from '@angular/core';

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

  constructor() { }

  cancel() {

  }

  save() {
    
  }
}
