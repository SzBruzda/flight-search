import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface User {
  firstName: string;
  lastName: string;
  cartItems: number
}

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  _user: User;

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  constructor(private http: HttpClient) {
    this.http.get<User>('fake-data/user').subscribe((user: User) => this.user = user);
  }

  updateCartList(): void {
    this.user.cartItems++;
  }
}
