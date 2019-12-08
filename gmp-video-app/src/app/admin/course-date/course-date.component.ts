import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gmp-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss']
})
export class CourseDateComponent {
  creationDate: Date|undefined;
}
