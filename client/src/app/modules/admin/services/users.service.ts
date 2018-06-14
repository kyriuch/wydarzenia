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
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.get<User[]>(
      'http://localhost:62056/api/account/users',
      {
        headers: httpHeaders
      });
  }

  deleteUsers(ids: number[]): Observable<number[]> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    const endPoint = 'http://localhost:62056/api/account/deleteusers?ids=' + ids.toString().split(',').join('&ids=');

    return this.http.delete<number[]>(
      endPoint,
      {
        headers: httpHeaders,
      }
    );
  }

  restartPasswords(ids: number[]): Observable<number[]> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

    return this.http.patch<number[]>('http://localhost:62056/api/account/restartpasswords',
      ids,
      {
        headers: httpHeaders
      });
  }
}
