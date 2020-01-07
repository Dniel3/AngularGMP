import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  constructor(readonly userService: UserService,
    private readonly router: Router) { }

  logOut() {
    this.userService.logout();
    this.router.navigate(['login']);
    console.log('log-out ');
  }
}
