import { IUser } from './../../../core/models/users-model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userInfo!: IUser;

  deleteProfile() {
    this.userApi.delete(this.userInfo.id).subscribe();
    localStorage.setItem('user', JSON.stringify(''));
    this.route.navigate(['/auth/login']);
    localStorage.setItem('auth', JSON.stringify({ auth: false }));
  }
  logOut() {
    localStorage.setItem('user', JSON.stringify(''));
    this.route.navigate(['/auth/login']);
    localStorage.setItem('auth', JSON.stringify({ auth: false }));
  }
  constructor(private userApi: UsersService, private route: Router) {}

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    console.log(`this.userInfo`, this.userInfo);
  }
}
