import { Component, OnInit, Input, EventEmitter, Output, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Course } from 'src/app/core/course-model';

@Component({
  selector: 'gmp-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss']
})
export class CourseListItemComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input() course: Course;
  @Output() remove = new EventEmitter<string>();

  constructor() {
    console.log('contructor');
  }

  delete() {
    this.remove.emit(this.course.id);
  }

  edit() {
    console.log('edit: ', this.course.id)
  }

  ngOnChanges() {
    console.log('On changes');
  }

  ngOnInit() {
    console.log('On init');
  }

  ngDoCheck() {
    console.log('Do check');
  }

  ngAfterContentInit() {
    console.log('After content init');
  }

  ngAfterContentChecked() {
    console.log('After content checked');
  }

  ngAfterViewInit() {
    console.log('After view init');
  }

  ngAfterViewChecked() {
    console.log('After view checked');
  }

  ngOnDestroy() {
    console.log('On destroy');
  }

  getFormatDuration(duration: number): string {
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return `${hours} h ${minutes} min'`;
  }
}
