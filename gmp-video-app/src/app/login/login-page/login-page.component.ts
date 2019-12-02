import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gmp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  email = '';
  password = '';

  constructor(private readonly userService: UserService, private readonly router: Router) { }

  login(){
    this.userService.login(this.email, this.password);
    this.router.navigate(['courses']);
    console.log('logged in successfully');
  }
}
