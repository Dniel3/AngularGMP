import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GmpState } from 'src/app/state/state';
import { Store } from '@ngrx/store';
import { login } from 'src/app/state/user/user.actions';

@Component({
  selector: 'gmp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = 'Morales';
  password = 'id';

  constructor(private readonly store: Store<GmpState>, private readonly userService: UserService) { }

  login() {
    this.store.dispatch(login({login: { login:this.email, password: this.password }}));
  }
}
