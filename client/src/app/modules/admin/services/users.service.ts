import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetchUsers(): Observable<User[]> {
    const httpHeaders = new HttpHeaders().
      append('Content-Type', 'application/json').
      append('Accept', 'application/json');

    return this.http.get<User[]>(
      'http://localhost:62056/api/account/users',
      {
        headers: httpHeaders
      });
  }
}
