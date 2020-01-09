import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { GmpState } from './state/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gmp-video-app';

  constructor(readonly userService: UserService) { }
}
