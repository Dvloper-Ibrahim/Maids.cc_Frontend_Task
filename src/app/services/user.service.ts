import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { IUser } from '../models/i-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: IUser[] = [];

  constructor(private httpClient: HttpClient) {}

  getUsersForPage(pageNum: number): Observable<any> {
    return this.httpClient.get<any>(
      `https://reqres.in/api/users?page=${pageNum}`
    );
  }

  async getUsersForSearch(): Promise<IUser[]> {
    let res1, res2;
    try {
      res1 = await fetch('https://reqres.in/api/users?page=1').then((res) =>
        res.json()
      );
      res2 = await fetch('https://reqres.in/api/users?page=2').then((res) =>
        res.json()
      );
    } catch (err) {
      console.error(err);
    } finally {
      this.users = [...res1.data, ...res2.data];
    }
    return this.users;
  }

  getUser(userID: number): Observable<any> {
    return this.httpClient.get<any>(`https://reqres.in/api/users/${userID}`);
  }
}
