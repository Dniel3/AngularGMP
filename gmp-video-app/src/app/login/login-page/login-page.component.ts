import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Token } from '../../core/model/login-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'gmp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm = new FormGroup({
    email: new FormControl('Morales', Validators.required),
    password: new FormControl('id', Validators.required),
  });


  constructor(private readonly userService: UserService) { }

  login() {
    this.userService.login({login: this.loginForm.controls['email'].value, password: this.loginForm.controls['password'].value});
  }
}
