import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Subject, Observable, from, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  localStorage = window.localStorage;
  private _loginEvent$: BehaviorSubject<{ access_token: string, refresh_token: string }> = new BehaviorSubject({access_token: this.localStorage.access_token,  refresh_token: this.localStorage.refresh_token});
  constructor() {

  }
  
  get loginEvent$(): Observable<{ access_token: string }> {
    return from(this._loginEvent$);
  }
  

  logOut() {
    console.log("logged out")
    this.localStorage.clear();
    this._loginEvent$.next({"access_token":"", 'refresh_token':''});
  }
  getToken(): string {
    return localStorage.getItem('access_token');
  }

  setToken(token: string, refreshToken: string): void {
    this.localStorage.setItem('access_token', token);
    this.localStorage.setItem('refresh_token', refreshToken);
    this._loginEvent$.next({ access_token: token, refresh_token: refreshToken });
  }


  clearToken(): void {
    localStorage.clear();
    this._loginEvent$.next({"access_token":"", 'refresh_token':''});
  }
}
