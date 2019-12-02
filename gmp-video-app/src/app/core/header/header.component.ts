import { Component } from '@angular/core';
import { User } from '../user-model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user?: User

  constructor(private readonly userService: UserService,
    private readonly router: Router) {
    this.user = userService.get();
  }

  isAuth(): boolean {
    return this.userService.isLoggedIn();
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['login']);
    console.log('log-out: ', this.user.name);
  }
}
