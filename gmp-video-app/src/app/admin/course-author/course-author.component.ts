import { Component, ViewChild, ElementRef, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, filter } from 'rxjs/operators';
import { Author } from '../../core/model/author-model';

@Component({
  selector: 'gmp-course-author',
  templateUrl: './course-author.component.html',
  styleUrls: ['./course-author.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseAuthorComponent),
      multi: true,
    }
  ]
})
export class CourseAuthorComponent implements ControlValueAccessor {
  addOnBlur = true;
  authInput = new FormControl();
  filteredAuthors$: Observable<Author[]>;
  authors: Author[] = [];

  @Input()
  options: Author[] = [];

  @ViewChild('authorInput', {static: false}) authorInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;

  onChange = (_ : any) => {};
  onTouch = (_ : any) => {};

  constructor() {
    this.filteredAuthors$ = this.authInput.valueChanges.pipe(
      filter(author => typeof author === 'string'), 
        map((author: string) => this._filter(author)));
  }

  remove(author: Author): void {
    const index = this.authors.indexOf(author);

    if (index >= 0) {
      this.authors.splice(index, 1);
      this.onChange(this.authors);
      this.onTouch(this.authors);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authors.push(event.option.value)
    this.onChange(this.authors);
    this.onTouch(this.authors);
    this.authorInput.nativeElement.value = '';
    this.authInput.setValue(null);
  }

  writeValue(obj: any): void {
    if(obj) {
      this.authors = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  private _filter(value: string): Author[] {
    if(!value) return this.options.slice();

    const filterValue = value.toLowerCase();

    return this.options.filter(author => author.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
