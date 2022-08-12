import { IUser } from './../../../core/models/users-model';
import { Observable, of } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  userInfo!: any;
  firstname = `first name must be Unique! `;
  lastname = `last name must be Unique! `;
  dateOfBirth = `Date of brith must be Unique! `;

  firstnameErr: boolean = false;
  lastnameErr: boolean = false;
  dateOfBirthErr: boolean = false;

  massage = '';
  public createForm() {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      bankAccountNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(18),
        ],
      ],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  update(form: any) {
    this.submitted = true;
    this.userApi.getAll().subscribe((res) => {
      this.chackUnique(res, form);
      if (!this.firstnameErr && !this.lastnameErr && !this.dateOfBirthErr) {
        this.userApi.update(this.userInfo.id, form).subscribe((res) => {
          this.massage = 'Profile is updated';
        });
      }
    });
  }

  chackUnique(res: any, f: any) {
    this.firstnameErr = res.find(
      (user: any) =>
        user.firstname === f.firstname && user.id !== this.userInfo.id
    )
      ? true
      : false;
    this.lastnameErr = res.find(
      (user: any) =>
        user.lastname === f.lastname && user.id !== this.userInfo.id
    )
      ? true
      : false;
    this.dateOfBirthErr = res.find(
      (user: any) =>
        user.dateOfBirth === f.dateOfBirth && user.id !== this.userInfo.id
    )
      ? true
      : false;
  }

  public myError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
  setValue() {
    this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
    this.userApi.find(this.userInfo.id).subscribe((user) => {
      this.form = this.fb.group({
        firstname: [user.firstname, [Validators.required]],
        lastname: [user.lastname, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        phoneNumber: [user.phoneNumber, [Validators.required]],
        bankAccountNumber: [
          user.bankAccountNumber,
          [
            Validators.required,
            Validators.minLength(9),
            Validators.maxLength(18),
          ],
        ],
        dateOfBirth: [user.dateOfBirth, [Validators.required]],
      });
      this.cd.detectChanges();
    });
  }
  constructor(
    private fb: FormBuilder,
    private userApi: UsersService,
    private route: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.setValue();
  }
}
