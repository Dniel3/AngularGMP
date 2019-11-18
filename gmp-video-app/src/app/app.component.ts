import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gmp-video-app';

  constructor(private readonly userService: UserService) { }

  isAuth(): boolean {
    return this.userService.isLoggedIn();
  }
}
