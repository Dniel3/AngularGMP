import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gmp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  course = '';

  @Output() search = new EventEmitter<string>();

  constructor() { }

  searchCourse() {
    console.log(this.course);
    this.search.emit(this.course);
  }
}
