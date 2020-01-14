import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/user-model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { GmpState } from 'src/app/state/state';
import { map } from 'rxjs/operators';


@Component({
  selector: 'gmp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly user$: Observable<User|undefined>;

  constructor(readonly userService: UserService,
    private readonly router: Router,
    store: Store<GmpState>) {
      this.user$ = store.pipe(map(state => state.courses.user));
      store.pipe(map(state => Boolean(state.courses.token) || Boolean(localStorage.getItem('token'))))
         .subscribe(this.userService.isAuth$);

     }

  logOut() {
    this.userService.logout();
    this.router.navigate(['login']);
    console.log('log-out ');
  }
}
