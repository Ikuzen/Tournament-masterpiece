import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { User } from '../users/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(4)]
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(4)]
    ],
    passwordBis: ['', [
      Validators.required,
      Validators.minLength(4)]
    ],
    email: ['', [
      Validators.required,
      Validators.email]
    ],
    birthdate: ['', [
        Validators.required]
    ]
  });
  user: User;
  get username() {return this.registerForm.value.username; }
  get password() {return this.registerForm.value.password; }
  get passwordBis() {return this.registerForm.value.passwordBis; }
  get email() {return this.registerForm.value.email; }
  get birthdate() {return this.registerForm.value.birthdate; }
  get usernameError() {return this.registerForm.controls.username.errors; }
  get passwordError() {return this.registerForm.controls.username.errors; }
  get passwordBisError() {return this.registerForm.controls.username.errors; }
  get emailError() {return this.registerForm.controls.username.errors; }
  get birthdateError() {return this.registerForm.controls.username.errors; }
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (
      this.username && !this.usernameError &&
      this.password && !this.passwordError &&
      this.email && !this.emailError &&
      this.birthdate && !this.birthdateError &&
      this.passwordBis && !this.passwordBisError &&
      (this.password === this.passwordBis)) {
      this.user = { username: this.username, password: this.password, email: this.email, birthdate: this.birthdate };
      this.userService.getByName(this.username)
        .subscribe(
          (result) => {
            this.userService.create(this.user).subscribe((result) => {
              this.router.navigate(['/login', { success: true }]);
            },
              (error) => {
                if (error.status) {
                  console.log(error);
                } else if (error?.error?.details[0]?.message === '"email" must be a valid email') {
                }
              });
          });
    } else {
      if (this.passwordBis !== this.password) {
        console.log('password not matching');
      }
      if (!(this.username &&
        this.password &&
        this.email &&
        this.birthdate &&
        this.passwordBis)) {
        console.log(this.usernameError);
        console.log(this.passwordError);
        console.log(this.emailError);
        console.log(this.birthdateError);
        console.log(this.passwordBisError);
        }
    }
  }

  showErrors(errorName) {
    console.log(this.registerForm.get(errorName).errors);
    console.log();
  }
}
