import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gmp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  course = '';

  @Output() search = new EventEmitter<string>();

  constructor(private readonly router: Router) { }

  searchCourse() {
    console.log(this.course);
    if(this.course.length === 3 || this.course === '') {
      this.search.emit(this.course);
    }
  }

  add() {
    this.router.navigate(['courses','new']);
  }
}
