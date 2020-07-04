import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../users/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LoginService } from './login.service';
import { Credentials } from './login-interfaces'
import * as action from '../../actions/login-page.actions'
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  private credentials: Credentials;
  errorMessage = "";
  constructor(private router: Router, private store: Store<any>, private route: ActivatedRoute, private loginService: LoginService, private toastService: ToastService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.success === "true") {
        this.toastService.success('Creation successful !', 'You can now login with your account')
      }
    });

  }
  login() {
    this.resetErrorMessage();
    if (this.username && this.password) {
      this.credentials = { username: this.username, password: this.password }
      this.loginService.login(this.credentials).subscribe((result) => {
        this.router.navigate(["/users"])
        this.toastService.success('successfully logged in', 'Welcome '+ this.username);
      },
        (err) => {
          this.errorMessage = err.error.err;
          this.toastService.showError('login error', err.error.err);
        });
    }
    else {
      this.errorMessage = "one of the fields are missing"
    }
  }
  passwordRecovery() {
    this.router.navigate(["/password-recovery"])
  }
  resetErrorMessage() {
    this.errorMessage = "";
  }
}
