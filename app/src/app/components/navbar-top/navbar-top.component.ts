import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { LoginService } from 'src/app/pages/login/login.service';
import { Store, select } from '@ngrx/store';
import { userSelector } from 'src/app/reducers/login-page.reducer';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.scss']
})
export class NavbarTopComponent implements OnInit {

  items: MenuItem[];
  constructor(private router: Router, private localStorageService: LocalStorageService, private loginService: LoginService, private readonly store: Store) {
  }
  private user$: BehaviorSubject<{ username?: string, role?: string }> = new BehaviorSubject(this.loginService.getUserFromToken(this.localStorageService.getToken()));

  get _user$(): Observable<{ username?: string, role?: string }> {
    return from(this.user$);
  }

  ngOnInit() {
    this.store.pipe(select(userSelector)).subscribe((appState) => {
      this.user$.next(appState.currentUser);
    });
  }

  show() {
    this._user$.pipe(
      take(1),
      tap((result) => { console.log(result) })
    ).subscribe();
  }

  isLoggedIn() {
    this._user$.subscribe((result) => {
      return result.role === 'guest' ? false : true;
    });
  }

  logout(){
    this.loginService.logout();
  }

  navigate(link: any) {
    this.router.navigate([link]);
  }
}
