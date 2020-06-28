import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject, Observable, from, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage = window.localStorage;
  private _loginEvent$: BehaviorSubject<{ access_token: string }> = new BehaviorSubject({access_token: this.localStorage.access_token});
  constructor() {

  }
  
  get loginEvent$(): Observable<{ access_token: string }> {
    return from(this._loginEvent$);
  }
  

  logOut() {
    console.log("logged out")
    this.localStorage.clear();
    this._loginEvent$.next({"access_token":""});
  }
  getToken(): string {
    return localStorage.getItem('access_token');
  }

  setToken(token: string): void {
    this.localStorage.setItem('access_token', token);
    this._loginEvent$.next({ access_token: token });
  }

  clearToken(): void {
    localStorage.clear();
    this._loginEvent$.next({"access_token":""});
  }
}
