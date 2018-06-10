import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRegisterDto } from '../dtos/user-register.dto';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLoginDto } from '../dtos/user-login.dto';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject(null);
  }

  register(userRegisterDto: UserRegisterDto): Observable<User> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Accept', 'application/json');

    return this.http.post<User>(
      'http://localhost:62056/api/account/register',
      userRegisterDto,
      {
        headers: httpHeaders
      }).pipe(
        tap(x => this.authenticate(x))
      );
  }

  login(userLoginDto: UserLoginDto): Observable<User> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Content-Type', 'application/json');
    httpHeaders = httpHeaders.append('Accept', 'application/json');

    return this.http.post<User>(
      'http://localhost:62056/api/account/login',
      userLoginDto,
      {
        headers: httpHeaders
      }).pipe(
        tap(x => this.authenticate(x))
      );
  }

  logout() {
    this.user.next(undefined);
  }

  isUserAuthenticated(): Observable<boolean> {
    if (this.user) {
      return of(true);
    }

    return of(false);
  }

  hasUserRole(role: string): Observable<boolean> {
    if (!this.user) {
      return of(false);
    }

    return of(this.user.value.roles.indexOf(role) >= 0);
  }

  private authenticate(user: User) {
    this.user.next(user);
  }
}
