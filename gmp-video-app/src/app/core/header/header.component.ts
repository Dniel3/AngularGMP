import { Component } from '@angular/core';
import { User } from '../model/user-model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(readonly userService: UserService,
    private readonly router: Router) {  }

  isAuth(): boolean {
    return this.userService.isLoggedIn();
  }

  logOut() {
    this.userService.logout();
    this.router.navigate(['login']);
    console.log('log-out ');
  }
}
