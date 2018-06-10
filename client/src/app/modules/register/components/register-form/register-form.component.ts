import { Component, OnInit } from '@angular/core';
import { UserRegisterDto } from '../../../shared/dtos/user-register.dto';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  passwordType: string;
  userRegister: UserRegisterDto;
  repeatedPassword: string;
  loading: boolean;
  error: string;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.passwordType = 'password';
    this.loading = false;

    this.userRegister = {
      email: '',
      firstName: '',
      lastName: '',
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

    this.auth.register(this.userRegister).subscribe(data => {
      console.log(data);
      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.error = err.error.toString();
      this.loading = false;
      console.log(err);
    });
  }

}
