import { Component, OnInit } from '@angular/core';
import { UserLoginDto } from '../../../shared/dtos/user-login.dto';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { interval } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  passwordType: string;
  userLogin: UserLoginDto;
  loading: boolean;
  error: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.passwordType = 'password';
    this.loading = false;

    this.userLogin = {
      login: '',
      password: ''
    };
  }

  passwordCheckbox($event) {
    if ($event.target.checked) {
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }

  submitForm() {
    this.loading = true;

    this.auth.login(this.userLogin)
    .subscribe((data) => {
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.error = err.error;

      interval(3000).subscribe(() => this.error = null);

      this.loading = false;
    });
  }
}
