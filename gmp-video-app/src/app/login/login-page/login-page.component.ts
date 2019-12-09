import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Token } from '../../core/model/login-model';

@Component({
  selector: 'gmp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = 'Morales';
  password = 'id';

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  login() {
    this.userService.login({login: this.email, password: this.password})
    .subscribe((response:Token) => {
      localStorage.setItem('token', response.token);
      this.userService.get();
      this.router.navigate(['courses']);
      console.log('logged in successfully');
    });
  }
}
