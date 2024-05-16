import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/i-user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  USERS: IUser[] = [];
  page: number = 1;
  count: number = 0;
  tableSize: number = 0;
  loading: boolean = true;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsersForPage(this.page).subscribe((response) => {
      this.USERS = response.data;
      this.count = response.total;
      this.tableSize = response.per_page;
      this.loading = false;
    });
  }

  onDataChange(num: number) {
    this.page = num;
    this.loading = true;
    this.loadUsers();
  }
}
