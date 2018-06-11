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

  user: BehaviorSubject<User>;

  private initialized: boolean;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject(null);
    this.initialized = false;
    this.init().subscribe(user => {
      this.user.next(user);
      this.initialized = true;
    });
  }

  init(): Observable<User> {
    if (this.initialized === undefined) {
      this.initialized = false;
    }

    if (this.initialized) {
      return of(this.user.value).pipe(tap(() => this.initialized = true));
    }

    const userStringified = window.localStorage.getItem('user');

    if (userStringified === null) {
      return of(null).pipe(tap(() => this.initialized = true));
    }

    return of(JSON.parse(userStringified)).pipe(tap(() => this.initialized = true));
  }

  register(userRegisterDto: UserRegisterDto): Observable<User> {
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

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
    const httpHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Accept', 'application/json');

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
    window.localStorage.removeItem('user');
    this.user.next(undefined);
  }

  isUserAuthenticated(): Observable<boolean> {
    if (this.user) {
      return of(true);
    }

    return of(false);
  }

  private authenticate(user: User) {
    window.localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }
}
