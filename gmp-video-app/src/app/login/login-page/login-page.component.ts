import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'gmp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  email = '';
  password = '';

  constructor(private readonly userService: UserService) { }

  ngOnInit() {
  }

  login(){
    this.userService.login();
  }
}
