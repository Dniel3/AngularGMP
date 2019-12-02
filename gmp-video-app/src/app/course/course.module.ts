import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { FormsModule } from '@angular/forms'
import { SectionComponent } from './section/section.component';
import { NewReleaseDirective } from './course-list/new-release.directive';
import { DurationPipe } from './course-list-item/duration.pipe';
import { OrderByPipe } from './course-list/order-by.pipe';
import { FilterCoursePipe } from './course-list/filter-course.pipe';
import { CourseCreateEditComponent } from './course-create-edit/course-create-edit.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CourseListComponent,
    CourseListItemComponent,
    CoursePageComponent,
    SectionComponent,
    NewReleaseDirective,
    DurationPipe,
    OrderByPipe,
    FilterCoursePipe,
    CourseCreateEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    RouterModule,
  ],
  exports: [
    CoursePageComponent,
  ]
})
export class CourseModule { }
