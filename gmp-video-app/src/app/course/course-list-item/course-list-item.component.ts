import { Component, OnInit, Input, EventEmitter, Output, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../core/course-model';

@Component({
  selector: 'gmp-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseListItemComponent {
  @Input() course: Course;
  @Output() remove = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  delete() {
    this.remove.emit(this.course.id);
  }

  editItem() {
    this.edit.emit(this.course.id);
  }
}
