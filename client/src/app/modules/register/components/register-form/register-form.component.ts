import { Component, OnInit } from '@angular/core';
import { UserRegisterDto } from '../../../shared/dtos/user-register.dto';
import { AuthService } from '../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private auth: AuthService, private router: Router) { }

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
    if (this.userRegister.password !== this.repeatedPassword) {
      this.error = 'Podane hasła nie pasują do siebie.';

      return;
    }

    this.loading = true;

    this.auth.register(this.userRegister).subscribe(data => {
      this.error = null;

      this.loading = false;

      this.router.navigateByUrl('/signForEvent');
    }, (err: HttpErrorResponse) => {
      this.error = err.error;

      this.loading = false;
    });
  }

}
