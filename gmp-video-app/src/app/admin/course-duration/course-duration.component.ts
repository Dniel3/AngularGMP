import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'gmp-course-duration',
  templateUrl: './course-duration.component.html',
  styleUrls: ['./course-duration.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseDurationComponent),
      multi: true,
    }
  ],
})
export class CourseDurationComponent implements ControlValueAccessor {
  duration: number|undefined;
  disabled = false;
  
  onChange = (_: number) => {};
  onTouch = (_: number) => {};

  set value(minutes: number) {
    this.duration = minutes;
    this.onChange(minutes);
    this.onTouch(minutes);
  }

  writeValue(obj: number): void {
    this.duration = obj;
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
