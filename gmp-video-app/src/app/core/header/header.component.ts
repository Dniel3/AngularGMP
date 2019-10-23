import { Component, OnInit } from '@angular/core';
import { User } from '../course-model';

@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: User = {
    id: '1',
    name: 'cosme',
    lastName: 'fulanito'
  };
  
  constructor() { }

  ngOnInit() {
  }

}
