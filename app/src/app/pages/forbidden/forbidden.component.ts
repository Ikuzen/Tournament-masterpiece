import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { userSelector } from '../../reducers/login-page.reducer';
import * as fromAuth from '@reducers/login-page.reducer';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private readonly store: Store<fromAuth.ApplicationState>) {
    this.store.pipe(select(userSelector)).subscribe((appState) => {
      if(appState.currentUser.role !== 'guest'){
        this.isLoggedIn = true;
      }
    })
  }

  ngOnInit(): void {
  }

}
