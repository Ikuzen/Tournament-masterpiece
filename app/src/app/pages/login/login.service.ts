import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials, JWTResponse } from './login-interfaces'
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as action from '../../actions/login-page.actions'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string;
  constructor(private readonly store: Store ,private router: Router, private route: ActivatedRoute, private http: HttpClient, private localStorage: LocalStorageService) {
  }

  login(credentials: Credentials) {
    return this.http.post<JWTResponse>('http://localhost:3000/login', credentials).pipe(
      tap((result) => {
        if (result.success) {
          this.clearToken()
          this.setToken(result.access_token);
          this.store.dispatch(action.login({
          currentUser: this.getUserFromToken(result.access_token)
        }));
          console.log(result)
          return "successfully connected";
        } else {
          return result.err;
        }
      },
        (error) => {
          return error;
        }))
  }
  checkToken() {
    return this.getTokenVerification().pipe(
      map((response) => {
        if (response.body) {
          return true; // boolean
        } else {
          return false; // boolean
        }
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }
  getUserFromToken(token: string): any{
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return {
        username: decodedToken.username,
        role: decodedToken.role
    };
  }

  getTokenVerification(): Observable<any> {
    return this.http.get<{ header, body }>(`http://localhost:3000/token/verify`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      }
    });
  }
  getToken(): string {
    this.token = localStorage.getItem('access_token');
    return this.token;
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  clearToken(): void {
    localStorage.clear();
    // localStorage.setItem('access_token', '');
    this.token = '';
  }
}

