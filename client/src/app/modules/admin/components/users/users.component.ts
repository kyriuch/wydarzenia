import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../../shared/models/user.model';
import { UserRegisterDto } from '../../../shared/dtos/user-register.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  selectedIndexes: number[];
  userRegister: UserRegisterDto;
  repeatedPassword: string;
  error: string;
  loading: boolean;
  passwordType: string;

  constructor(private usersService: UsersService, private auth: AuthService) { }

  ngOnInit() {
    this.selectedIndexes = [];
    this.userRegister = {
      email: '',
      firstName: '',
      lastName: '',
      login: '',
      password: ''
    };
    this.passwordType = 'password';

    this.repeatedPassword = '';
    this.loading = false;

    this.usersService.fetchUsers().subscribe(data => {
      this.users = data;
    });
  }

  selectRow(index: number): void {
    const arrayIndex = this.selectedIndexes.indexOf(index);

    if (arrayIndex >= 0) {
      this.selectedIndexes.splice(arrayIndex, 1);
    } else {
      this.selectedIndexes.push(index);
    }
  }

  isRowSelected(index: number): boolean {
    return this.selectedIndexes.indexOf(index) >= 0;
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

    this.auth.register(this.userRegister, true).subscribe(data => {
      this.error = null;

      this.users.push(data);

      this.loading = false;
    }, (err: HttpErrorResponse) => {
      this.error = err.error;

      this.loading = false;
    });
  }

}
