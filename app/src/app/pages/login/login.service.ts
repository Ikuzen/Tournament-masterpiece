import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Credentials, JWTResponse } from './login-interfaces'
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private localStorage: LocalStorageService) {
  }

  login(credentials: Credentials) {
    return this.http.post<JWTResponse>('http://localhost:3000/login', credentials).pipe(
      tap((result) => {
        if (result.success) {
          this.setToken(result.access_token);
          return "successfully connected"
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
        console.log(error);
        return of(false);
      })
    );
  }
  getTokenVerification(): Observable<any> {
    return this.http.get<{ header, body }>(`http://localhost:3000/token/verify`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      }
    });
  }
  getToken() {
    this.token = localStorage.getItem('access_token');
    return this.token;
  }

  setToken(token) {
    localStorage.setItem('access_token', token);
  }

  clearToken() {
    localStorage.setItem('access_token', '');
    this.token = '';
  }
}

