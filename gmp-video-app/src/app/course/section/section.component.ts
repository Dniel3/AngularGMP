import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'gmp-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {
  searchForm = new FormGroup({
    textFragment: new FormControl(),
  });

  @Output() search = new EventEmitter<string>();

  constructor(private readonly router: Router) {
    this.searchForm.controls['textFragment'].valueChanges.subscribe(this.search);
  }

  add() {
    this.router.navigate(['courses','new']);
  }
}
