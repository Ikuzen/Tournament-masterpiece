import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject, Observable, from, of, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/pages/users/user';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage = window.localStorage;
  private _loginEvent$: BehaviorSubject<{ username: string }> = new BehaviorSubject({username: this.localStorage.username});
  constructor() {

  }
  
  get loginEvent$(): Observable<{ username: string }> {
    return from(this._loginEvent$);
  }
  
  saveSession(user: User) {
    this.localStorage.setItem("username", user.username);
    this._loginEvent$.next({ username: user.username });
  }

  logOut() {
    console.log("logged out")
    this.localStorage.clear();
    this._loginEvent$.next({"username":""});
  }
}