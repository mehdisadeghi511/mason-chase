import { IUser } from './../../../core/models/users-model';
import { UsersService } from '../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  xxx!: any;
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
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9_-]{10}')],
      ],
      bankAccountNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9_-]{9,18}')],
      ],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  submit(f: any) {
    let form = f.value;
    this.submitted = true;
    console.log(`  form.valid`, f.invalid);
    form.valid;
    this.userApi.getAll().subscribe((res) => {
      this.chackUnique(res, form);
      if (
        !this.firstnameErr &&
        !this.lastnameErr &&
        !this.dateOfBirthErr &&
        !f.invalid
      ) {
        this.userApi.create(form).subscribe((res) => {
          this.route.navigate(['/auth/login']);
        });
      }
    });
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

  myError(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
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
