import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  items: MenuItem[];
  isLoggedIn = false;
  loggedUser = null;
  constructor(private router: Router, private loginService: LoginService, private readonly store: Store) {
  }

  ngOnInit() {
    this.loginService.getTokenVerification().subscribe((result)=>{
      if(result.body){
        this.loggedUser = result.body.username;
        this.isLoggedIn = true;
      }
    });
  }


  navigate(link: any) {
    this.router.navigate([link]);
  }
}
