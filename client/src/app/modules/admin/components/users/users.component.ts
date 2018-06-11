import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.fetchUsers().subscribe(data => {
      this.users = data;
    });
  }

}
