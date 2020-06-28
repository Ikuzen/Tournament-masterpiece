import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { Store, select } from '@ngrx/store';
import { userSelector, ApplicationState } from 'src/app/reducers/login-page.reducer';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  items: MenuItem[];
  user$;
  _user$;
  constructor(private router: Router, private loginService: LoginService, private readonly store: Store) {
  }

  ngOnInit() {
    this.user$ = this.store.pipe(select(userSelector))
    this.user$.subscribe((appState: ApplicationState) => {
      this._user$ = appState
      console.log(this._user$)});
  }


  navigate(link: any) {
    this.router.navigate([link]);
  }
}
