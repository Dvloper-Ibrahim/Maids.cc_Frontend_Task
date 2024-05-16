import { Component, OnInit } from '@angular/core';
import { IUser } from '../../models/i-user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css',
})
export class UserDetailsComponent implements OnInit {
  userID: number = 0;
  user: IUser = {} as IUser;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userID = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userID) {
      this.userService.getUser(this.userID).subscribe((response) => {
        this.user = response.data;
        document.title = this.user.first_name + "'s profile";
        this.loading = false;
      });
    }
  }
}
