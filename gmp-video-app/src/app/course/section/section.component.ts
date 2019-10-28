import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gmp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  course = '';

  constructor() { }

  ngOnInit() {
  }

  search() {
    console.log(this.course);
  }
}
