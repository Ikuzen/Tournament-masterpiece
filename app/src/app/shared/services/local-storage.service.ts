import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject, Observable, from, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage = window.localStorage;
  private _loginEvent$: BehaviorSubject<{ accessToken: string }> = new BehaviorSubject({accessToken: this.localStorage.accessToken});
  constructor() {

  }
  
  get loginEvent$(): Observable<{ accessToken: string }> {
    return from(this._loginEvent$);
  }
  
  saveSession(jwt: string) {
    this.localStorage.setItem("accessToken", jwt);
    this._loginEvent$.next({ accessToken: jwt });
  }

  logOut() {
    console.log("logged out")
    this.localStorage.clear();
    this._loginEvent$.next({"accessToken":""});
  }
}
