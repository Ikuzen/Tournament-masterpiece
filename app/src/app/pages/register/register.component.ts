import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { User } from '../users/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    passwordBis: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    birthdate: new FormControl('',
      [
        Validators.required
      ]),
  });
  get username() {return this.registerForm.value.username;}
  get password() {return this.registerForm.value.password;}
  get passwordBis() {return this.registerForm.value.passwordBis;}
  get email() {return this.registerForm.value.email;}
  get birthdate() {return this.registerForm.value.birthdate;}
  user: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (
      this.username &&
      this.password &&
      this.email &&
      this.birthdate &&
      this.passwordBis &&
      (this.password === this.passwordBis)) {
      this.user = { 'username': this.username, 'password': this.password, 'email': this.email, 'birthdate': this.birthdate }
      this.userService.getByName(this.username)
        .subscribe(
          (result) => {
            this.userService.create(this.user).subscribe((result) => {
              this.router.navigate(['/login', { success: true }]);
            },
              (error) => {
                if (error.status) {
                  console.log(error)
                }
                else if (error?.error?.details[0]?.message === '"email" must be a valid email') {
                }
              });
          })
    }
    else if (this.passwordBis !== this.password) {
    }
    else {
    }
  }
}
