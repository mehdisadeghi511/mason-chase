import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  public createForm() {
    this.form = this.fb.group({
      firstname: ['', []],
      lastname: ['', []],
    });
  }

  login(form: any) {
    this.userApi.getAll().subscribe((res) => {
      let user = res.find((user) => user.firstname === form.firstname);
      if (user) {
        if (user.lastname === form.lastname) {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('auth', JSON.stringify({ auth: true }));
          this.route.navigate(['/main/dashboard']);
        }
      }
    });
  }

  constructor(
    private fb: FormBuilder,
    private userApi: UsersService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }
}
