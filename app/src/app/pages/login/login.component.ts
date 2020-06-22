import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../users/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LoginService } from './login.service';
import { Credentials } from './login-interfaces'
import * as action from '../../actions/login-page.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  private credentials: Credentials;
  accountCreated = false;
  errorMessage = "";
  constructor(private router: Router, private store:Store<any>, private route: ActivatedRoute, private userService: UserService, private localStorage: LocalStorageService, private loginService: LoginService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.success === "true") {
        this.accountCreated = true;
      }
    });

  }
  login() {
    this.resetErrorMessage();
    if (this.username && this.password) {
      this.store.dispatch(action.login({ username: this.username, password: this.password }));

      this.credentials = { username: this.username, password: this.password }
      this.loginService.login(this.credentials).subscribe((result) => {
        this.router.navigate(["/user"])
      },
        (err) => {
          this.errorMessage = err.error.err;
        });
    }
    else{
      this.errorMessage = "one of the fields are missing"
    }
  }
  passwordRecovery() {
    this.router.navigate(["/password-recovery"])
  }
  resetErrorMessage(){
    this.errorMessage = "";
  }
}
