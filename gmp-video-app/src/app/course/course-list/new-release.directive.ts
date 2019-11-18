import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[gmpNewRelease]'
})
export class NewReleaseDirective {

  @Input('gmpNewRelease')
  set courseDate(creationDate: Date) {
    let borderColor = null;
    const currentDate = new Date();
    const freshThreshold = new Date();
    freshThreshold.setDate(freshThreshold.getDate() - 14);
    if(creationDate < currentDate && creationDate >= freshThreshold) {
      borderColor = '5px solid green';
    }
    if(creationDate > currentDate) {
      borderColor = '5px solid blue';
    }

    this.render2.setStyle(this.courseBox.nativeElement.firstChild, 'border', borderColor)
  }

  constructor(private courseBox: ElementRef<any>, private render2: Renderer2) { }

}
