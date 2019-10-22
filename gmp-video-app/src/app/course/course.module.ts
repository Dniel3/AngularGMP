import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CoursePageComponent } from './course-page/course-page.component';
import { SectionComponent } from './section/section.component';



@NgModule({
  declarations: [
    CourseListComponent,
    CourseListItemComponent,
    CoursePageComponent,
    SectionComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [
    CoursePageComponent,
  ]
})
export class CourseModule { }
