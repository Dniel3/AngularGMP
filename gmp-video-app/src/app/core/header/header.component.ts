import { Component } from '@angular/core';
import { User } from '../user-model';

@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User = {
    id: '1',
    name: 'cosme',
    lastName: 'fulanito'
  };
}
