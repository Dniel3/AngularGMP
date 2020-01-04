import { Component, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../model/user-model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
