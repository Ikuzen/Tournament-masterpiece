import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../users/user.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']

})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  accountCreated = false;
  errorMessage = "";
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private localStorage:LocalStorageService
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.success === "true") {
        this.accountCreated = true;
      }
    });

  };
  login() {
    if (this.username && this.password) {
      this.userService.getByName(this.username).subscribe((result) => {
        if (result.password === this.password) {
          this.localStorage.saveSession(result)
          this.router.navigate(["/user"])
          console.log("successfully connected")
        }
        else {
          this.errorMessage = 'wrong password';
        }
      },
        (error) => {
          this.errorMessage = "user does not exist";
        });
    }
  }
  passwordRecovery(){
    this.router.navigate(["/password-recovery"])
  }
}
