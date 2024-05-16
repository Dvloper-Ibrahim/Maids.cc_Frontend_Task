import { Component, OnInit } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { IUser } from './models/i-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Frontend Task';
  userID: string = '';
  users: IUser[] = [];
  filteredUsers: IUser[] = [];

  constructor(private userService: UserService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsersForSearch();
  }

  getResults(e: any): void {
    this.filteredUsers = this.userID
      ? this.users.filter((user) => user.id.toString().includes(this.userID))
      : [];
  }

  goToUser(e: Event, id: number) {
    e.preventDefault();
    this.userID = '';
    this.filteredUsers = [];
    this.router.navigate(['users/user', id]);
  }
}
