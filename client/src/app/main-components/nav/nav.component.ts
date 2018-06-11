import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/shared/models/user.model';
import { AuthService } from '../../modules/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: User;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = this.auth.user.value;

    this.auth.user.subscribe(newUser => this.user = newUser);
  }

  isUserAGuest(): boolean {
    return !this.user || (this.user.roles.indexOf('User') < 0 && this.user.roles.indexOf('Admin') < 0);
  }

  isUserAUser(): boolean {
    return this.user && this.user.roles.indexOf('User') >= 0;
  }

  isUserAnAdmin(): boolean {
    return this.user && this.user.roles.indexOf('Admin') >= 0;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('');
  }
}
