import { Component, OnInit } from '@angular/core';
import { UserLoginDto } from '../../../shared/dtos/user-login.dto';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  passwordType: string;
  userLogin: UserLoginDto;

  constructor() { }

  ngOnInit() {
    this.passwordType = 'password';

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
    console.log(this.userLogin);
  }
}
