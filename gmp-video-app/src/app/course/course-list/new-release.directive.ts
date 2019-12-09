import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gmpNewRelease]'
})
export class NewReleaseDirective {

  @Input('gmpNewRelease')
  set courseDate(creationDate: string) {
    let borderColor = null;
    const courseDate = new Date(creationDate);
    const currentDate = new Date();
    const freshThreshold = new Date();
    freshThreshold.setDate(freshThreshold.getDate() - 14);
    if(courseDate < currentDate && courseDate >= freshThreshold) {
      borderColor = '5px solid green';
    }
    if(courseDate > currentDate) {
      borderColor = '5px solid blue';
    }

    this.render2.setStyle(this.courseBox.nativeElement.firstChild, 'border', borderColor)
  }

  constructor(private courseBox: ElementRef<any>, private render2: Renderer2) { }

}
