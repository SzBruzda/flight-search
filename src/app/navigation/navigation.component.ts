import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  navItems = [
    {
      name: 'loty',
      link: '/loty'
    },
    // {
    //   name: 'rezerwacja',
    //   link: '/rezerwacja'
    // }
  ]

  user: User;

  constructor(private userInfo: UserInfoService) { }

  ngOnInit(): void {
    this.user = this.userInfo.user;
  }

}
