import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {userSelector, ApplicationState} from '../../reducers/login-page.reducer'
@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css'],
})
export class MyCounterComponent {
  user$: any;
  _user$: any

  constructor(private readonly store: Store) {
  }
  ngOnInit(){
    this.user$ = this.store.pipe(select(userSelector))
    this.user$.subscribe((appState: ApplicationState) => this._user$ = appState);
  }
  show(){
    console.log(this._user$);
  }
}