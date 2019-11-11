import { Directive, ElementRef, Input } from '@angular/core';

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
    this.courseBox.nativeElement.firstChild.style.border = borderColor;
  }

  constructor(private courseBox: ElementRef<any>) { }

}
