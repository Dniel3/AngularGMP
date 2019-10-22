import { Injectable } from '@angular/core';
import { User } from '../core/course-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User = {
    id: '1',
    name: 'Olek',
    lastName: 'Pogrebniak',
  }

  constructor() { }

  get(): User {
    return this.user;
  }
}
