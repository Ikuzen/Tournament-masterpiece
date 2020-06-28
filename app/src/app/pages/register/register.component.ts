import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../users/user.service';
import { User } from '../users/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']

})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  passwordBis: string;
  email: string;
  birthdate: Date;
  usernameError = "";
  passwordError = "";
  emailError = "";
  birthDateError = "";
  generalError= "";
  user: User;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit() {
    this.generalError = "";
    if (this.username && this.password && this.email && this.birthdate && this.passwordBis && (this.password === this.passwordBis)) {
      this.user = { 'username': this.username, 'password': this.password, 'email': this.email, 'birthdate': this.birthdate }
      this.userService.getByName(this.username)
      .subscribe(
        (result) => {
            this.userService.create(this.user).subscribe((result) => {
              this.router.navigate(['/login', { success: true }]);
            },
            (error) => {
              if (error.status) {
                this.usernameError = 'There already is a user with that username';
                console.log(error)
              }
              else if (error?.error?.details[0]?.message === '"email" must be a valid email') {
                this.emailError = '"email" must be a valid email';
              }
            });
          })
    }
    else if(this.passwordBis !== this.password){
      this.generalError = "passwords are not matching"
    }
    else{
      this.generalError = "fields are missing"
    }
  }
}
