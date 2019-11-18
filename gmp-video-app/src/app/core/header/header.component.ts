import { Component } from '@angular/core';
import { User } from '../user-model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user?: User

  constructor(private readonly userService: UserService) {
    this.user = userService.get();
  }

  isAuth(): boolean {
    return this.userService.isLoggedIn();
  }

  logOut() {
    this.userService.logout();
    console.log('log-out: ', this.user.name);
  }
}
