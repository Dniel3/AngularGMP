import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gmp-course-date',
  templateUrl: './course-date.component.html',
  styleUrls: ['./course-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDateComponent),
      multi: true
    }
  ],
})
export class CourseDateComponent implements ControlValueAccessor {
  @Input()
  hasError = false;

  creationDate: string|undefined;
  disabled = false;

  set value(date: string) {
    this.creationDate = date;
    this.onTouch(date);
    this.onChange(date);
  }

  get value() {
    return this.creationDate;
  }

  onChange = (_: string) => {};
  onTouch = (_: string) => {};

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
