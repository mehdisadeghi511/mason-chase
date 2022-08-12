import { IUser } from './../../../core/models/users-model';
import { UsersService } from './../../../core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  firstname = `first name must be Unique! `;
  lastname = `last name must be Unique! `;
  dateOfBirth = `Date of brith must be Unique! `;

  firstnameErr: boolean = false;
  lastnameErr: boolean = false;
  dateOfBirthErr: boolean = false;

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

  submit(form: any) {
    this.submitted = true;
    let f = form.value;
    this.userApi.getAll().subscribe((res) => {
      this.chackUnique(res, f);
    });
    this.userApi.create(form.value).subscribe((res) => {});
  }

  chackUnique(res: any, f: any) {
    this.firstnameErr = res.find((user: any) => user.firstname === f.firstname)
      ? true
      : false;
    this.lastnameErr = res.find((user: any) => user.lastname === f.lastname)
      ? true
      : false;
    this.dateOfBirthErr = res.find(
      (user: any) => user.dateOfBirth === f.dateOfBirth
    )
      ? true
      : false;
  }

  public myError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };

  constructor(private fb: FormBuilder, private userApi: UsersService) {}

  ngOnInit(): void {
    this.createForm();
  }
}
