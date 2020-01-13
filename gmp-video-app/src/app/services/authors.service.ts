import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../core/model/author-model';
import { COURSES_SERVER } from '../core/constants/config';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(private readonly httpClient: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(`${COURSES_SERVER}/authors`);
  }

}
